import { writeFile } from "node:fs/promises";

const FIELD_METRICS = [
  "largest_contentful_paint",
  "interaction_to_next_paint",
  "cumulative_layout_shift",
];
const DEFAULT_URLS = [
  "https://indataflow.com/",
  "https://indataflow.com/case-study/",
  "https://indataflow.com/resources/",
];
const THRESHOLDS = {
  lcp: [2500, 4000],
  inp: [200, 500],
  cls: [0.1, 0.25],
};

function readOptions(argv) {
  const values = (name) => argv
    .filter((argument) => argument.startsWith(`--${name}=`))
    .map((argument) => argument.slice(name.length + 3));
  const value = (name, fallback) => values(name).at(-1) ?? fallback;
  const urls = values("url");
  const strategy = value("strategy", "mobile");
  const format = value("format", "markdown");
  const output = value("output", "");

  if (!["mobile", "desktop", "both"].includes(strategy)) {
    throw new Error("--strategy must be mobile, desktop or both.");
  }
  if (!["markdown", "json"].includes(format)) {
    throw new Error("--format must be markdown or json.");
  }

  return {
    urls: (urls.length ? urls : DEFAULT_URLS).map((url) => new URL(url).href),
    strategies: strategy === "both" ? ["mobile", "desktop"] : [strategy],
    format,
    output,
  };
}

function rating(metric, value) {
  if (value == null) return "unavailable";
  const [good, poor] = THRESHOLDS[metric];
  if (value <= good) return "good";
  if (value <= poor) return "needs improvement";
  return "poor";
}

function metricValue(record, name) {
  const raw = record?.metrics?.[name]?.percentiles?.p75;
  return raw == null ? null : Number(raw);
}

async function requestJson(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(120_000),
  });
  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message ?? `Request failed with HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return payload;
}

async function queryCrux(url, strategy, apiKey) {
  if (!apiKey) {
    return { scope: "unavailable", reason: "Set GOOGLE_API_KEY or CRUX_API_KEY to enable CrUX field data." };
  }

  const endpoint = new URL("https://chromeuxreport.googleapis.com/v1/records:queryRecord");
  endpoint.searchParams.set("key", apiKey);
  const request = async (body) => requestJson(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      formFactor: strategy === "mobile" ? "PHONE" : "DESKTOP",
      metrics: FIELD_METRICS,
    }),
  });

  let payload;
  let scope = "url";
  try {
    payload = await request({ url });
  } catch (error) {
    if (error.status !== 404) throw error;
    scope = "origin";
    try {
      payload = await request({ origin: new URL(url).origin });
    } catch (originError) {
      if (originError.status === 404) {
        return {
          scope: "unavailable",
          reason: "CrUX has insufficient real-user observations for both this URL and its origin.",
        };
      }
      throw originError;
    }
  }

  const record = payload.record;
  const lcp = metricValue(record, "largest_contentful_paint");
  const inp = metricValue(record, "interaction_to_next_paint");
  const cls = metricValue(record, "cumulative_layout_shift");

  return {
    scope,
    collectionPeriod: record?.collectionPeriod ?? null,
    lcp: { value: lcp, unit: "ms", rating: rating("lcp", lcp) },
    inp: { value: inp, unit: "ms", rating: rating("inp", inp) },
    cls: { value: cls, unit: "score", rating: rating("cls", cls) },
  };
}

async function queryPageSpeed(url, strategy, apiKey) {
  const endpoint = new URL("https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.append("category", "performance");
  endpoint.searchParams.append("category", "seo");
  if (apiKey) endpoint.searchParams.set("key", apiKey);

  const payload = await requestJson(endpoint);
  const lighthouse = payload.lighthouseResult;
  const audits = lighthouse?.audits ?? {};
  const numericValue = (name) => {
    const result = audits[name]?.numericValue;
    return typeof result === "number" ? result : null;
  };
  const score = (name) => {
    const result = lighthouse?.categories?.[name]?.score;
    return typeof result === "number" ? Math.round(result * 100) : null;
  };

  return {
    fetchedAt: lighthouse?.fetchTime ?? null,
    performanceScore: score("performance"),
    seoScore: score("seo"),
    lab: {
      lcp: { value: numericValue("largest-contentful-paint"), unit: "ms" },
      cls: { value: numericValue("cumulative-layout-shift"), unit: "score" },
      tbt: { value: numericValue("total-blocking-time"), unit: "ms" },
    },
    note: "Lighthouse does not provide representative lab INP without real interaction data; TBT is reported as a diagnostic, not as an INP substitute.",
    warnings: lighthouse?.runWarnings ?? [],
  };
}

function formatNumber(value, digits = 0) {
  if (value == null) return "—";
  return Number(value).toFixed(digits);
}

function fieldCell(metric) {
  if (!metric || metric.value == null) return "—";
  const digits = metric.unit === "score" ? 2 : 0;
  return `${formatNumber(metric.value, digits)} (${metric.rating})`;
}

function markdownReport(report) {
  const lines = [
    "# InDataFlow Core Web Vitals report",
    "",
    `Generated: ${report.generatedAt}`,
    "",
    "CrUX values are real-user p75 field measurements. PageSpeed values are Lighthouse lab measurements. Lab TBT is diagnostic only and is not reported as INP.",
    "",
    "| URL | Device | CrUX scope | Field LCP | Field INP | Field CLS | PSI performance | PSI SEO | Lab LCP | Lab CLS | Lab TBT |",
    "|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|",
  ];

  for (const result of report.results) {
    const pageSpeed = result.pageSpeed;
    lines.push([
      `| ${result.url}`,
      result.strategy,
      result.crux.scope,
      fieldCell(result.crux.lcp),
      fieldCell(result.crux.inp),
      fieldCell(result.crux.cls),
      pageSpeed.performanceScore ?? "—",
      pageSpeed.seoScore ?? "—",
      formatNumber(pageSpeed.lab?.lcp.value),
      formatNumber(pageSpeed.lab?.cls.value, 3),
      formatNumber(pageSpeed.lab?.tbt.value),
    ].join(" | ") + " |");
  }

  const errors = report.results.flatMap((result) => [
    result.crux.error ? `${result.url} (${result.strategy}, CrUX): ${result.crux.error}` : null,
    result.pageSpeed.error ? `${result.url} (${result.strategy}, PageSpeed): ${result.pageSpeed.error}` : null,
  ].filter(Boolean));
  if (errors.length) {
    lines.push("", "## Errors", "");
    for (const error of errors) lines.push(`- ${error}`);
  }

  if (!report.apiKeyConfigured) {
    lines.push(
      "",
      "## Configuration",
      "",
      "CrUX was skipped because no API key was configured. Set `GOOGLE_API_KEY` or `CRUX_API_KEY` after enabling and restricting the Chrome UX Report API.",
    );
  }

  return lines.join("\n") + "\n";
}

async function main() {
  if (process.argv.includes("--help")) {
    process.stdout.write([
      "Usage: npm run seo:performance -- [options]",
      "",
      "  --url=https://example.com/   Repeat for multiple URLs",
      "  --strategy=mobile|desktop|both",
      "  --format=markdown|json",
      "  --output=/path/report.md",
      "",
      "Environment: GOOGLE_API_KEY or CRUX_API_KEY enables CrUX and authenticated PageSpeed requests.",
      "",
    ].join("\n"));
    return;
  }

  const options = readOptions(process.argv.slice(2));
  const apiKey = process.env.GOOGLE_API_KEY || process.env.CRUX_API_KEY || process.env.PAGESPEED_API_KEY || "";
  const results = [];

  for (const url of options.urls) {
    for (const strategy of options.strategies) {
      const [cruxResult, pageSpeedResult] = await Promise.allSettled([
        queryCrux(url, strategy, apiKey),
        queryPageSpeed(url, strategy, apiKey),
      ]);
      const errorMessage = (result) => result.reason instanceof Error ? result.reason.message : String(result.reason);
      results.push({
        url,
        strategy,
        crux: cruxResult.status === "fulfilled"
          ? cruxResult.value
          : { scope: "error", error: errorMessage(cruxResult) },
        pageSpeed: pageSpeedResult.status === "fulfilled"
          ? pageSpeedResult.value
          : { error: errorMessage(pageSpeedResult), lab: {} },
      });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    apiKeyConfigured: Boolean(apiKey),
    results,
  };
  const output = options.format === "json"
    ? JSON.stringify(report, null, 2) + "\n"
    : markdownReport(report);

  if (options.output) {
    await writeFile(options.output, output, "utf8");
    process.stdout.write(`Report written to ${options.output}\n`);
  } else {
    process.stdout.write(output);
  }

  if (results.some((result) => result.crux.error || result.pageSpeed.error)) process.exitCode = 1;
}

await main();

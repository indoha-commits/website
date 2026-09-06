# SEO reporting

## Structured data

Run the automated Article and Breadcrumb validation for every EAC workflow:

```bash
npm run seo:validate
```

The test checks canonical alignment, Article identity and authorship, breadcrumb ordering and absolute URLs, plus the final serialized JSON-LD emitted into the prerendered document head.

## Core Web Vitals and PageSpeed

The performance report keeps two kinds of evidence separate:

- CrUX: real-user p75 LCP, INP and CLS for the requested page and device. If a page lacks enough observations, the script falls back to origin-level data.
- PageSpeed Insights: Lighthouse performance and SEO scores plus lab LCP, CLS and TBT. TBT is a responsiveness diagnostic; it is not presented as lab INP.

Enable the Chrome UX Report API and PageSpeed Insights API in the Google Cloud project. Create a restricted API key and expose it only to the local command:

```bash
export GOOGLE_API_KEY="your-restricted-api-key"
```

Do not use a `VITE_*` variable or commit the key. Restrict it in Google Cloud to the Chrome UX Report API and PageSpeed Insights API.

Run the default mobile report for the homepage, case study and resource hub:

```bash
npm run seo:performance
```

Run mobile and desktop reports for selected URLs:

```bash
npm run seo:performance -- \
  --strategy=both \
  --url=https://indataflow.com/ \
  --url=https://indataflow.com/case-study/ \
  --url=https://indataflow.com/resources/eac/rwanda-import-clearance-workflow/ \
  --output=/tmp/indataflow-cwv.md
```

Use `--format=json` for machine-readable output. PageSpeed can run without a key at lower availability, but CrUX requires the key.

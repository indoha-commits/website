import { matchPath } from "react-router-dom";
import { companyDocuments } from "@/data/company-documents";

const siteName = "InDataFlow";
const siteUrl = "https://indataflow.com";
const defaultImage = `${siteUrl}/favicon.png`;
const defaultTitle = "InDataFlow | Cargo Operations Platform for Freight & Logistics";
const defaultDescription = "Connect shipping documents, validation, cargo events, approvals and client updates in one traceable shipment record. Built for freight forwarders, clearing agents and logistics teams operating across East Africa.";
const canonicalStatement = "InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record.";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  industry: "Logistics Technology",
  email: "hello@indataflow.com",
};
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
};

type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  type?: "website" | "article";
  jsonLd?: Array<Record<string, unknown>>;
};

export type ResolvedSeo = SeoConfig & {
  url: string;
};

function softwareApplicationSchema(pageName: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteName} ${pageName}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url: `${siteUrl}${path}`,
  };
}

function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

function articleSchema(headline: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: `${siteUrl}${path}`,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
}

const staticPages: Array<{ pattern: string; config: SeoConfig }> = [
  {
    pattern: "/",
    config: {
      title: defaultTitle,
      description: defaultDescription,
      canonicalPath: "/",
      type: "website",
      jsonLd: [organizationSchema, websiteSchema, {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: canonicalStatement,
        url: siteUrl,
      }],
    },
  },
  {
    pattern: "/product/",
    config: {
      title: "Product | InDataFlow",
      description: "See how InDataFlow connects shipment documents, validation, cargo events and client updates into one traceable shipment record for freight operations.",
      canonicalPath: "/product/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Product", canonicalStatement, "/product/")],
    },
  },
  {
    pattern: "/how-it-works/",
    config: {
      title: "How InDataFlow Works | InDataFlow",
      description: "Follow the shipment workflow from document intake to validation, cargo milestones, approvals and client visibility inside InDataFlow.",
      canonicalPath: "/how-it-works/",
      jsonLd: [organizationSchema, softwareApplicationSchema("How It Works", canonicalStatement, "/how-it-works/")],
    },
  },
  {
    pattern: "/pricing/",
    config: {
      title: "Pricing | InDataFlow",
      description: "Volume-based pricing for freight forwarders, clearing agents and logistics teams using InDataFlow to run cargo operations and document workflows.",
      canonicalPath: "/pricing/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Pricing", canonicalStatement, "/pricing/")],
    },
  },
  {
    pattern: "/case-study/",
    config: {
      title: "Case Study | InDataFlow",
      description: "See how a freight operation reduced manual follow-up, improved document control and gave clients clearer shipment visibility with InDataFlow.",
      canonicalPath: "/case-study/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Case Study", canonicalStatement, "/case-study/")],
    },
  },
  {
    pattern: "/contact/",
    config: {
      title: "Book a Walkthrough | InDataFlow",
      description: "Book a walkthrough to see how InDataFlow fits your cargo operation, document intake flow and client visibility requirements.",
      canonicalPath: "/contact/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Contact", canonicalStatement, "/contact/")],
    },
  },
  {
    pattern: "/company-documentation/",
    config: {
      title: "Company Documentation | InDataFlow",
      description: "Read public InDataFlow legal, privacy, contact and security documents in fully indexable website pages.",
      canonicalPath: "/company-documentation/",
      jsonLd: [organizationSchema, breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Company Documentation", path: "/company-documentation/" },
      ])],
    },
  },
  {
    pattern: "/solutions/freight-forwarders/",
    config: {
      title: "For Freight Forwarders | InDataFlow",
      description: "Centralize shipment documents, validation, milestones and client updates in one cargo record built for freight forwarding teams.",
      canonicalPath: "/solutions/freight-forwarders/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Freight Forwarders", canonicalStatement, "/solutions/freight-forwarders/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions/freight-forwarders/" },
        { name: "Freight Forwarders", path: "/solutions/freight-forwarders/" },
      ])],
    },
  },
  {
    pattern: "/solutions/clearing-agents/",
    config: {
      title: "For Clearing Agents | InDataFlow",
      description: "Keep shipment documents, approvals, cargo milestones and operational accountability connected across customs and warehouse handoffs.",
      canonicalPath: "/solutions/clearing-agents/",
      jsonLd: [organizationSchema, softwareApplicationSchema("Clearing Agents", canonicalStatement, "/solutions/clearing-agents/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Solutions", path: "/solutions/clearing-agents/" },
        { name: "Clearing Agents", path: "/solutions/clearing-agents/" },
      ])],
    },
  },
  {
    pattern: "/resources/",
    config: {
      title: "Resources | InDataFlow",
      description: "Operational guides for bills of lading, commercial invoices, packing lists and shipment document workflows in freight logistics.",
      canonicalPath: "/resources/",
      jsonLd: [organizationSchema, breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
      ])],
    },
  },
  {
    pattern: "/resources/bill-of-lading-workflow/",
    config: {
      title: "Bill of Lading Workflow | InDataFlow",
      description: "Learn how freight teams validate a bill of lading against a commercial invoice and packing list before cargo status is shared with clients.",
      canonicalPath: "/resources/bill-of-lading-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams validate a bill of lading against invoice and packing list", "Operational bill of lading workflow for freight teams.", "/resources/bill-of-lading-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Bill of Lading Workflow", path: "/resources/bill-of-lading-workflow/" },
      ])],
    },
  },
  {
    pattern: "/resources/commercial-invoice-workflow/",
    config: {
      title: "Commercial Invoice Workflow | InDataFlow",
      description: "See how freight teams check commercial invoice data, connect it to shipment records and keep approvals traceable across operations.",
      canonicalPath: "/resources/commercial-invoice-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams validate a commercial invoice inside shipment operations", "Operational commercial invoice workflow for freight teams.", "/resources/commercial-invoice-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Commercial Invoice Workflow", path: "/resources/commercial-invoice-workflow/" },
      ])],
    },
  },
  {
    pattern: "/resources/packing-list-workflow/",
    config: {
      title: "Packing List Workflow | InDataFlow",
      description: "Understand how packing list details support cargo validation, operational review and client visibility across freight teams.",
      canonicalPath: "/resources/packing-list-workflow/",
      type: "article",
      jsonLd: [organizationSchema, articleSchema("How freight teams use packing lists to verify cargo records", "Operational packing list workflow for freight teams.", "/resources/packing-list-workflow/"), breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources/" },
        { name: "Packing List Workflow", path: "/resources/packing-list-workflow/" },
      ])],
    },
  },
  {
    pattern: "/login/",
    config: {
      title: "Log In | InDataFlow",
      description: "Access InDataFlow client and operations portals.",
      canonicalPath: "/login/",
      robots: "noindex, nofollow",
      jsonLd: [organizationSchema],
    },
  },
];

const documentRoutes = companyDocuments.map((document) => ({
  pattern: `/company-documentation/${document.slug}/`,
  config: {
    title: `${document.title} | InDataFlow`,
    description: document.description,
    canonicalPath: `/company-documentation/${document.slug}/`,
    jsonLd: [organizationSchema, articleSchema(document.title, document.description, `/company-documentation/${document.slug}/`), breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Company Documentation", path: "/company-documentation/" },
      { name: document.title, path: `/company-documentation/${document.slug}/` },
    ])],
  },
}));

export const prerenderRoutes = [
  "/",
  "/product/",
  "/how-it-works/",
  "/pricing/",
  "/case-study/",
  "/contact/",
  "/company-documentation/",
  ...companyDocuments.map((document) => `/company-documentation/${document.slug}/`),
  "/solutions/freight-forwarders/",
  "/solutions/clearing-agents/",
  "/resources/",
  "/resources/bill-of-lading-workflow/",
  "/resources/commercial-invoice-workflow/",
  "/resources/packing-list-workflow/",
  "/login/",
  "/404",
] as const;

export const sitemapRoutes = prerenderRoutes.filter((route) => route !== "/login/" && route !== "/404");

export function resolveSeo(urlOrPath: string): ResolvedSeo {
  const pathname = getPathname(urlOrPath);
  const matched = [...staticPages, ...documentRoutes].find((page) =>
    Boolean(matchPath({ path: page.pattern, end: true }, pathname)),
  );

  if (!matched) {
    return {
      title: "Page Not Found | InDataFlow",
      description: defaultDescription,
      canonicalPath: pathname,
      robots: "noindex, nofollow",
      jsonLd: [organizationSchema],
      type: "website",
      url: `${siteUrl}${normalizePath(pathname)}`,
    };
  }

  return {
    type: matched.config.type ?? "website",
    robots: matched.config.robots ?? "index, follow",
    ...matched.config,
    url: `${siteUrl}${matched.config.canonicalPath}`,
  };
}

export function renderSeoHead(seo: ResolvedSeo) {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="author" content="${siteName}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots ?? "index, follow")}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.type ?? "website")}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.url)}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:image" content="${escapeHtml(defaultImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(defaultImage)}" />`,
  ];

  if (seo.jsonLd?.length) {
    tags.push(`<script id="seo-structured-data" type="application/ld+json">${escapeJson(JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd))}</script>`);
  }

  return tags.join("\n    ");
}

export function applySeoToDocument(seo: ResolvedSeo) {
  document.title = seo.title;
  setMeta("name", "description", seo.description);
  setMeta("name", "author", siteName);
  setMeta("name", "robots", seo.robots ?? "index, follow");
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:type", seo.type ?? "website");
  setMeta("property", "og:url", seo.url);
  setMeta("property", "og:site_name", siteName);
  setMeta("property", "og:image", defaultImage);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  setMeta("name", "twitter:image", defaultImage);
  setCanonical(seo.url);
  setStructuredData(seo.jsonLd ?? []);
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function setStructuredData(jsonLd: Array<Record<string, unknown>>) {
  const existing = document.head.querySelector<HTMLScriptElement>("#seo-structured-data");
  if (!jsonLd.length) {
    existing?.remove();
    return;
  }

  const payload = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd);
  if (existing) {
    existing.textContent = payload;
    return;
  }

  const element = document.createElement("script");
  element.id = "seo-structured-data";
  element.type = "application/ld+json";
  element.textContent = payload;
  document.head.appendChild(element);
}

function getPathname(urlOrPath: string) {
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return normalizePath(new URL(urlOrPath).pathname);
  }
  return normalizePath(urlOrPath.split("?")[0] || "/");
}

function normalizePath(pathname: string) {
  if (!pathname || pathname === "") return "/";
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeJson(value: string) {
  return value.replaceAll("<", "\\u003c");
}

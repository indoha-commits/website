import { describe, expect, it } from "vitest";
import { eacCorridorGuides } from "@/data/eac-corridor-guides";
import { prerenderRoutes, renderSeoHead, resolveSeo, sitemapRoutes } from "@/lib/seo";

describe("EAC corridor guide publishing", () => {
  it("publishes every guide with substantive operating controls", () => {
    expect(eacCorridorGuides).toHaveLength(5);

    for (const guide of eacCorridorGuides) {
      expect(guide.stages.length).toBeGreaterThanOrEqual(4);
      expect(guide.documents.length).toBeGreaterThanOrEqual(6);
      expect(guide.exceptions.length).toBeGreaterThanOrEqual(3);
      expect(guide.sources.length).toBeGreaterThanOrEqual(4);
      expect(guide.stages.every((stage) => stage.actions.length >= 4)).toBe(true);
      expect(guide.stages.every((stage) => stage.evidence.length >= 4)).toBe(true);
    }
  });

  it("registers each guide for canonical SEO, prerendering and the sitemap", () => {
    for (const guide of eacCorridorGuides) {
      const path = `/resources/eac/${guide.slug}/`;
      const seo = resolveSeo(path);

      expect(seo.canonicalPath).toBe(path);
      expect(seo.type).toBe("article");
      expect(seo.title).toContain(guide.title);
      expect(prerenderRoutes).toContain(path);
      expect(sitemapRoutes).toContain(path);
    }
  });

  it("emits valid Article and Breadcrumb JSON-LD for every guide", () => {
    for (const guide of eacCorridorGuides) {
      const path = `/resources/eac/${guide.slug}/`;
      const seo = resolveSeo(path);
      const schemas = seo.jsonLd ?? [];
      const article = schemas.find((schema) => schema["@type"] === "Article");
      const breadcrumbs = schemas.find((schema) => schema["@type"] === "BreadcrumbList");

      expect(article).toMatchObject({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${seo.url}#article`,
        headline: guide.title,
        description: guide.description,
        url: seo.url,
        inLanguage: "en",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": seo.url,
        },
        author: {
          "@type": "Organization",
          name: "InDataFlow",
          url: "https://indataflow.com",
        },
        publisher: {
          "@type": "Organization",
          name: "InDataFlow",
          url: "https://indataflow.com",
        },
      });

      const items = breadcrumbs?.itemListElement as Array<Record<string, unknown>>;
      expect(items).toHaveLength(3);
      expect(items.map((item) => item.position)).toEqual([1, 2, 3]);
      expect(items.map((item) => item.name)).toEqual(["Home", "Resources", guide.title]);
      expect(items.every((item) => typeof item.item === "string" && item.item.startsWith("https://indataflow.com/"))).toBe(true);
      expect(items.at(-1)?.item).toBe(seo.url);

      const head = renderSeoHead(seo);
      const payload = head.match(/<script id="seo-structured-data" type="application\/ld\+json">(.+)<\/script>/)?.[1];
      expect(payload).toBeTruthy();
      expect(() => JSON.parse(payload ?? "")).not.toThrow();
      expect(JSON.parse(payload ?? "[]")).toEqual(schemas);
    }
  });
});

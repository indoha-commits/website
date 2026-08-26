import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { SiteRoutes } from "./routes";
import { prerenderRoutes, renderSeoHead, resolveSeo, sitemapRoutes } from "./lib/seo";

export { prerenderRoutes, sitemapRoutes };

export function render(url: string) {
  const queryClient = new QueryClient();
  const seo = resolveSeo(url);
  const appHtml = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <AppShell>
          <SiteRoutes />
        </AppShell>
      </StaticRouter>
    </QueryClientProvider>,
  );

  return {
    appHtml,
    headHtml: renderSeoHead(seo),
  };
}

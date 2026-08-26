import { mkdir, readFile, writeFile, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const clientDir = path.join(rootDir, "dist");
const serverEntry = pathToFileURL(path.join(rootDir, ".ssr", "entry-server.js")).href;
const { render, prerenderRoutes, sitemapRoutes } = await import(serverEntry);
const template = await readFile(path.join(clientDir, "index.html"), "utf8");

for (const route of prerenderRoutes) {
  const { appHtml, headHtml } = render(route);
  const html = template
    .replace("<!--app-head-->", headHtml)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const filePath = route === "/"
    ? path.join(clientDir, "index.html")
    : route === "/404"
      ? path.join(clientDir, "404.html")
      : path.join(clientDir, route.replace(/^\//, ""), "index.html");

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, html, "utf8");
}

const today = new Date().toISOString().split("T")[0];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapRoutes
  .map((route) => `  <url><loc>https://indataflow.com${route}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}\n</urlset>\n`;
await writeFile(path.join(clientDir, "sitemap.xml"), sitemapXml, "utf8");

await cp(path.join(clientDir, "index.html"), path.join(clientDir, "200.html"));

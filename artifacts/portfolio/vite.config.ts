import { defineConfig, runnerImport, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs/promises";
import path from "node:path";
import { DEFAULT_TITLE, SITE_URL, projectPageTitle } from "./src/lib/site";

const port = Number(process.env.PORT ?? "3000");
const basePath = process.env.BASE_PATH ?? "/Portfolio/";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * GitHub Pages has no SPA fallback, so after the build we write:
 * - projects/<id>.html for each project (served at /projects/<id> with a 200 and its own title/meta),
 * - 404.html, so any other deep link still boots the app (which shows the Not Found page),
 * - sitemap.xml, generated from the same project list.
 */
function githubPagesStaticRoutes(): Plugin {
  let outDir = "";

  return {
    name: "github-pages-static-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const { module } = await runnerImport<typeof import("./src/hooks/usePortfolioData")>(
        path.resolve(import.meta.dirname, "src/hooks/usePortfolioData.ts"),
        { configFile: false, base: basePath, logLevel: "error" },
      );
      const { projects } = module.usePortfolioData();
      const indexHtml = await fs.readFile(path.join(outDir, "index.html"), "utf8");

      const withMeta = (html: string, meta: { title: string; description: string; url: string }) => {
        const title = escapeHtml(meta.title);
        const description = escapeHtml(meta.description);
        const url = escapeHtml(meta.url);
        return html
          .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${description}"`)
          .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${title}"`)
          .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
      };

      await fs.mkdir(path.join(outDir, "projects"), { recursive: true });
      for (const project of projects) {
        const html = withMeta(indexHtml, {
          title: projectPageTitle(project.title),
          description: project.description,
          url: `${SITE_URL}projects/${project.id}`,
        });
        await fs.writeFile(path.join(outDir, "projects", `${project.id}.html`), html);
      }

      const notFoundHtml = withMeta(indexHtml, {
        title: DEFAULT_TITLE,
        description: "Page not found.",
        url: SITE_URL,
      })
        .replace(/\s*<link rel="canonical"[^>]*>/, "")
        .replace("</head>", `  <meta name="robots" content="noindex" />\n  </head>`);
      await fs.writeFile(path.join(outDir, "404.html"), notFoundHtml);

      const urls = [SITE_URL, ...projects.map((p) => `${SITE_URL}projects/${p.id}`)];
      const sitemap = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
        ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
        `</urlset>`,
        ``,
      ].join("\n");
      await fs.writeFile(path.join(outDir, "sitemap.xml"), sitemap);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), githubPagesStaticRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

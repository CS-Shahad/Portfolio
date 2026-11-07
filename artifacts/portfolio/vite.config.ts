import { createServer, defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs/promises";
import path from "node:path";
import { DEFAULT_TITLE, SITE_TAGLINE, SITE_URL, projectPageTitle } from "./src/lib/site";

const port = Number(process.env.PORT ?? "3000");
const basePath = process.env.BASE_PATH ?? "/";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type PortfolioData = ReturnType<typeof import("./src/hooks/usePortfolioData").usePortfolioData>;

/** llms.txt: a plain-markdown summary for AI tools, built only from the site's own content. */
function buildLlmsTxt(data: PortfolioData): string {
  const { profile, about, experience, education, projects, certifications, skills } = data;
  const bioSentences = about.bio.split(/(?<=[.!?])\s+/);
  const current = experience[0];
  const skillGroups = new Map<string, string[]>();
  for (const skill of skills) skillGroups.set(skill.category, [...(skillGroups.get(skill.category) ?? []), skill.name]);

  return [
    `# ${profile.name}`,
    ``,
    `> ${SITE_TAGLINE}. Based in ${profile.location}.`,
    ``,
    `I'm ${profile.name}, ${profile.intro} ${bioSentences[bioSentences.length - 1]}`,
    ``,
    `## Current role`,
    ``,
    ...(current ? [`- ${current.role} at ${current.company}, ${current.duration}`] : []),
    ``,
    `## Education`,
    ``,
    `- ${education.degree}, ${education.school} (${education.dates}). ${education.gpa}, ${education.honours}.`,
    ``,
    `## Projects`,
    ``,
    ...projects.map((p) => `- [${p.title}](${SITE_URL}projects/${p.id}): ${p.description}`),
    ``,
    `## Certifications`,
    ``,
    ...certifications.map((c) => `- ${c.title}: ${c.issuer}${c.date ? `, ${c.date}` : ""}`),
    ``,
    `## Skills`,
    ``,
    ...[...skillGroups].map(([category, names]) => `- ${category}: ${names.join(", ")}`),
    ``,
    `## Links`,
    ``,
    `- [Website](${SITE_URL})`,
    `- [CV (PDF)](${SITE_URL}${profile.cv_file})`,
    `- [GitHub](${profile.github_url})`,
    `- [LinkedIn](${profile.linkedin_url})`,
    ``,
  ].join("\n");
}

/**
 * After the client build:
 * - prerender every route to static HTML (index.html, projects/<id>.html, 404.html) so tools that
 *   don't run JavaScript see the full content; src/main.tsx hydrates it in the browser,
 * - give each project page its own title/meta, and 404.html a noindex,
 * - GitHub Pages has no SPA fallback: projects/<id>.html is served at /projects/<id> with a 200, and
 *   404.html still boots the app for any other deep link,
 * - write sitemap.xml and llms.txt from the same data.
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
      // A short-lived Vite server loads the app for rendering. It stays open until the end of this
      // hook because lazy-loaded pages (ProjectDetail) are imported while rendering.
      const vite = await createServer({
        configFile: false,
        root: import.meta.dirname,
        base: basePath,
        logLevel: "error",
        appType: "custom",
        server: { middlewareMode: true, hmr: false, ws: false },
        plugins: [react()],
        resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
      });

      try {
        const server = (await vite.ssrLoadModule("/src/entry-server.tsx")) as typeof import("./src/entry-server");
        const data = server.usePortfolioData();
        const { projects } = data;
        const template = await fs.readFile(path.join(outDir, "index.html"), "utf8");
        const emptyRoot = '<div id="root"></div>';
        if (!template.includes(emptyRoot)) throw new Error('index.html: <div id="root"></div> not found');

        // `route` is recorded so the client hydrates only when it is on that same route.
        const prerender = async (route: string, { hydrate = true } = {}) => {
          const appHtml = await server.render(route);
          const attr = hydrate ? ` data-prerendered-path="${route}"` : "";
          return template.replace(emptyRoot, `<div id="root"${attr}>${appHtml}</div>`);
        };

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

        await fs.writeFile(path.join(outDir, "index.html"), await prerender("/"));

        await fs.mkdir(path.join(outDir, "projects"), { recursive: true });
        for (const project of projects) {
          const html = withMeta(await prerender(`/projects/${project.id}`), {
            title: projectPageTitle(project.title),
            description: project.description,
            url: `${SITE_URL}projects/${project.id}`,
          });
          await fs.writeFile(path.join(outDir, "projects", `${project.id}.html`), html);
        }

        // Served for any unknown URL, so the browser renders it from scratch instead of hydrating
        const notFoundHtml = withMeta(await prerender("/404", { hydrate: false }), {
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
        await fs.writeFile(path.join(outDir, "llms.txt"), buildLlmsTxt(data));
      } finally {
        await vite.close();
      }
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

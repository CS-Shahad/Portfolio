# Shahad Al-Matrafi — Portfolio

Personal portfolio for a Data Analyst (Machine Learning · Power BI · Python), live at **https://shahadalmatrafi.com/**.

Built with React, Vite, Tailwind CSS, Framer Motion and wouter. It is a fully static site deployed to GitHub Pages; the contact form posts to [Formspree](https://formspree.io), so there is no backend.

---

## Where the content lives

| What | File |
|---|---|
| Bio, experience, projects, skills, certifications, books & events | `artifacts/portfolio/src/hooks/usePortfolioData.ts` |
| Education | `artifacts/portfolio/src/components/Education.tsx` |
| Social / contact links | `artifacts/portfolio/src/components/Footer.tsx` |
| Page titles, site URL | `artifacts/portfolio/src/lib/site.ts` |
| CV, logo, images | `artifacts/portfolio/public/` |

Field notes for `usePortfolioData.ts` (each shape is documented by the TypeScript interfaces at the top of the file):

- `projects[].tags` — `"AI"`, `"Data Analysis"`, `"Automation"`.
- `projects[].thumbnail_url` / `image_gallery[].url` — image URLs. For local files, put them in `public/` and use `` `${import.meta.env.BASE_URL}projects/my-image.png` ``.
- `skills[].icon_name` — a [Feather icon](https://react-icons.github.io/react-icons/icons/fi/) name. Only the icons listed in `ICONS` in `src/components/Skills.tsx` are bundled; add new ones there.
- `certifications[].badge_url` (optional) — badge image, shown at 112×112 without cropping.
- `certifications[].credential_url` (optional) — when set, the card links to the credential.

Each project gets its own page at `/projects/<id>`; the build generates a static HTML file per project plus `sitemap.xml`, so new projects are picked up automatically.

The build also **prerenders** every page (home, each project, and `404.html`) to static HTML with the full content, so search engines, AI assistants and other tools that don't run JavaScript can read it; React then hydrates it in the browser (`src/entry-server.tsx`, and the plugin in `vite.config.ts`). It also writes `llms.txt`, a plain-text summary for AI tools, from the same data. Profile details (location, intro, CV file, links) and education live in `usePortfolioData.ts` too.

---

## Run locally

Requires Node.js 22+ and pnpm 11 (`npm install -g pnpm@11`).

```bash
pnpm install
cp artifacts/portfolio/.env.example artifacts/portfolio/.env   # optional: enables the contact form
pnpm --filter @workspace/portfolio run dev                      # http://localhost:3000/
```

Other commands:

```bash
pnpm --filter @workspace/portfolio run build    # production build -> artifacts/portfolio/dist/public
pnpm --filter @workspace/portfolio run serve    # preview the production build
pnpm run typecheck
```

---

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs dependencies (`pnpm install --frozen-lockfile`), builds the portfolio and publishes `artifacts/portfolio/dist/public` to GitHub Pages.

The site is served from the custom domain **shahadalmatrafi.com** at the root path (`/`). The domain is set under **Settings → Pages → Custom domain**; because the site is deployed by a GitHub Actions workflow, no `CNAME` file is needed (GitHub ignores it for Actions deployments).

Because CI uses a frozen lockfile, run `pnpm install` and commit `pnpm-lock.yaml` whenever you change dependencies.

### Contact form secret

The form reads `VITE_FORMSPREE_ENDPOINT` at build time. Set it under **Settings → Secrets and variables → Actions** as a repository secret named `VITE_FORMSPREE_ENDPOINT` (e.g. `https://formspree.io/f/xxxxxxxx`). Never commit a real `.env` file — it is git-ignored.

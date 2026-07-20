# Shahad Al-Matrafi Portfolio

A professional portfolio website for a Data Analysis | AI | Automation professional. Built with React + Vite. Content lives directly in the codebase, and the contact form is powered by Formspree.

---

## Environment Variables

Copy `artifacts/portfolio/.env.example` to `artifacts/portfolio/.env` and fill in:

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`) |

In production (Replit), set this as a Replit Secret instead of committing a `.env` file.

---

## Editing Content

All portfolio content (bio, work experience, projects, skills, certifications, books, and events) lives in one place:

`artifacts/portfolio/src/hooks/usePortfolioData.ts`

Edit the `ABOUT`, `EXPERIENCE`, `PROJECTS`, `SKILLS`, `CERTIFICATIONS`, and `PERSONAL_INFO` constants directly to update what's shown on the site. The shape of each constant is documented by the TypeScript interfaces at the top of the file.

**Column/field notes:**
- `projects[].tags` — accepted values: `"AI"`, `"Data Analysis"`, `"Automation"`
- `projects[].thumbnail_url` / `image_gallery[].url` — full image URLs (upload images somewhere and link them, e.g. GitHub, an image host, or the `public/` folder for local assets)
- `skills[].category` — accepted values: `"Artificial Intelligence"`, `"Automation"`, `"Data Analysis"`, `"Technical Stack"`
- `skills[].icon_name` — an icon name from [react-icons/fi](https://react-icons.github.io/react-icons/icons/fi/) (Feather icons)

The **Education** section (`src/components/Education.tsx`) and social/contact links (`src/components/Footer.tsx`) are hardcoded directly in their components — edit those files to update your school, GitHub, LinkedIn, and email.

---

## Contact Form

The contact form submits directly to Formspree — no backend or database required. Messages arrive in the inbox tied to your Formspree account.

---

## Local Development

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev
```

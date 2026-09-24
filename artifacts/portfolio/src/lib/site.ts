// Site-wide constants and small helpers. Kept free of browser/Vite-only APIs
// so the build step (vite.config.ts) can import it to generate static pages.

export const SITE_NAME = "Shahad Al-Matrafi";
export const SITE_TAGLINE = "Data & Automation Specialist";
export const SITE_URL = "https://cs-shahad.github.io/Portfolio/";
export const DEFAULT_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

/** "Fraud Detection — Python ML Pipeline + Power BI" -> "Fraud Detection" */
export function projectShortTitle(title: string): string {
  return title.split(" — ")[0].trim();
}

export function projectPageTitle(title: string): string {
  return `${projectShortTitle(title)} — ${SITE_NAME}`;
}

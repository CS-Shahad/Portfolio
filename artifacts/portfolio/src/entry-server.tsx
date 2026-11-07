// Build-time rendering only: vite.config.ts loads this module to prerender each route to
// static HTML (so crawlers and AI tools see the content) and to generate llms.txt.
import { prerenderToNodeStream } from "react-dom/static";
import App from "./App";

export { usePortfolioData } from "./hooks/usePortfolioData";

/** Renders a route to HTML, waiting for lazy-loaded pages to finish. */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(<App ssrPath={path} />);
  const chunks: Buffer[] = [];
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString("utf8");
}

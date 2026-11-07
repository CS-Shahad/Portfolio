import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// The build prerenders each route into its HTML file (see vite.config.ts) and marks the
// route it rendered on the container. Hydrate only when that matches the current URL;
// otherwise (404.html served for another URL, or the dev server) render from scratch.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const currentPath = window.location.pathname.slice(base.length).replace(/\/+$/, "") || "/";

if (container.dataset.prerenderedPath === currentPath) {
  hydrateRoot(container, <App />);
} else {
  container.replaceChildren();
  createRoot(container).render(<App />);
}

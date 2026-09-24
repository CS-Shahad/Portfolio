import { useEffect } from "react";
import { DEFAULT_TITLE } from "./site";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Smooth-scrolls to a section on the current page. Returns false if it isn't rendered. */
export function scrollToSection(id: string): boolean {
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (id === "home") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const element = document.getElementById(id);
  if (!element) return false;
  element.scrollIntoView({ behavior });
  return true;
}

/** Sets document.title while the calling page is mounted. */
export function useDocumentTitle(title: string = DEFAULT_TITLE) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

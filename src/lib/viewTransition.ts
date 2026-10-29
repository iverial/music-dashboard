import { flushSync } from "react-dom";

type DocumentWithTransitions = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

/**
 * Runs a state update inside a View Transition when the browser supports it, so
 * elements with a view-transition-name (the track rows) glide to their new place.
 * Falls back to a plain update, and respects prefers-reduced-motion.
 */
export function withViewTransition(update: () => void) {
  const doc = document as DocumentWithTransitions;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduceMotion) {
    update();
    return;
  }

  doc.startViewTransition(() => {
    flushSync(update);
  });
}

import { flushSync } from "react-dom";

type ViewTransition = { finished: Promise<unknown> };

type DocumentWithTransitions = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

/**
 * Runs a state update inside a View Transition when the browser supports it, so
 * the track rows glide to their new place. Falls back to a plain update, and
 * respects prefers-reduced-motion.
 *
 * Rows are only named (data-vt on <html>, see motion.css) while the transition
 * runs: a permanent view-transition-name would keep every row in its own
 * stacking context for no reason.
 */
export function withViewTransition(update: () => void) {
  const doc = document as DocumentWithTransitions;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduceMotion) {
    update();
    return;
  }

  const root = document.documentElement;
  root.setAttribute("data-vt", "");

  const transition = doc.startViewTransition(() => {
    flushSync(update);
  });

  const clear = () => root.removeAttribute("data-vt");
  transition.finished.then(clear, clear);
}

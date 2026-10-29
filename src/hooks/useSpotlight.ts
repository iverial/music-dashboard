import { useEffect } from "react";

/**
 * Feeds the pointer position to the card under it (--mx / --my). The glow itself
 * is drawn by CSS (.card::after), so this is the only JavaScript that effect needs.
 */
export function useSpotlight() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".card");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - box.left}px`);
      card.style.setProperty("--my", `${event.clientY - box.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

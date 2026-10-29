import { useCallback, useEffect, useRef, useState } from "react";

/** After a click the clicked section stays highlighted while the smooth scroll runs */
const PIN_MS = 900;

/**
 * Which nav item is active.
 *
 * - Clicking an item pins it. It stays active while it is still on screen, so
 *   sections that share a row (the track list and the artists card) cannot steal the highlight.
 * - Otherwise the section with the most pixels in the viewport wins, with the
 *   first one at the very top of the page and the last one at the very bottom.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  const pin = useRef<{ id: string; until: number } | null>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const viewport = window.innerHeight;

      const sections = ids.map((id) => {
        const box = document.getElementById(id)?.getBoundingClientRect();
        if (!box) return { id, visible: 0, ratio: 0 };
        const visible = Math.max(0, Math.min(box.bottom, viewport) - Math.max(box.top, 0));
        return { id, visible, ratio: visible / Math.max(1, Math.min(box.height, viewport)) };
      });

      const pinned = pin.current;
      if (pinned) {
        const section = sections.find((item) => item.id === pinned.id);
        if (performance.now() < pinned.until || (section && section.ratio > 0.3)) {
          setActive(pinned.id);
          return;
        }
        pin.current = null;
      }

      const atTop = window.scrollY < 80;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (atTop) {
        setActive(ids[0]);
      } else if (atBottom) {
        setActive(ids[ids.length - 1]);
      } else {
        const best = sections.reduce((top, item) => (item.visible > top.visible ? item : top), sections[0]);
        setActive(best.id);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  const select = useCallback((id: string) => {
    pin.current = { id, until: performance.now() + PIN_MS };
    setActive(id);
  }, []);

  return { active, select };
}

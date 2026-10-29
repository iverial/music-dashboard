import { useState } from "react";
import type { RankedTrack } from "@/data/types";

/**
 * Queue and transport state of the (visual only) player.
 * The ticking clock lives in <Player /> so the whole dashboard does not re-render every tick.
 */
export function usePlayer(queue: RankedTrack[], lookup: ReadonlyMap<string, RankedTrack>, initialId: string) {
  const [currentId, setCurrentId] = useState(initialId);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // the current track can drop out of the top 10 when the period changes, so look it up in the full catalogue
  const current = lookup.get(currentId) ?? queue[0];

  /** Clicking the current track toggles play/pause, anything else starts playing it */
  function select(id: string) {
    if (id === current.id) {
      setPlaying((value) => !value);
      return;
    }
    setCurrentId(id);
    setPlaying(true);
  }

  function step(direction: 1 | -1) {
    const index = queue.findIndex((track) => track.id === current.id);
    let next: RankedTrack;

    if (shuffle && queue.length > 1) {
      const others = queue.filter((track) => track.id !== current.id);
      next = others[Math.floor(Math.random() * others.length)];
    } else if (index === -1) {
      next = direction === 1 ? queue[0] : queue[queue.length - 1];
    } else {
      next = queue[(index + direction + queue.length) % queue.length];
    }

    setCurrentId(next.id);
    setPlaying(true);
  }

  return {
    current,
    playing,
    shuffle,
    repeat,
    select,
    toggle: () => setPlaying((value) => !value),
    next: () => step(1),
    prev: () => step(-1),
    toggleShuffle: () => setShuffle((value) => !value),
    toggleRepeat: () => setRepeat((value) => !value),
  };
}

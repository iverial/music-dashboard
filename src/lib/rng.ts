/** mulberry32: a tiny seeded PRNG, so generated data is identical on server and client. */
export function createRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

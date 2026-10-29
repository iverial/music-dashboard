export type IconName =
  | "home"
  | "music"
  | "users"
  | "trend"
  | "code"
  | "search"
  | "play"
  | "pause"
  | "prev"
  | "next"
  | "shuffle"
  | "repeat"
  | "heart"
  | "up"
  | "down"
  | "headphones"
  | "clock";

interface IconProps {
  name: IconName;
  className?: string;
}

/** Every icon in the page is a <use> of one symbol in the sprite below */
export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className ? `icon ${className}` : "icon"} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Rendered once in the root layout */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></symbol>
      <symbol id="i-music" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></symbol>
      <symbol id="i-trend" viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></symbol>
      <symbol id="i-code" viewBox="0 0 24 24"><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z" fill="currentColor" stroke="none" /></symbol>
      <symbol id="i-pause" viewBox="0 0 24 24"><rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none" /><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none" /></symbol>
      <symbol id="i-prev" viewBox="0 0 24 24"><path d="M19 5.5v13a.8.8 0 0 1-1.25.66L9 13a1.2 1.2 0 0 1 0-2l8.75-6.16A.8.8 0 0 1 19 5.5z" fill="currentColor" stroke="none" /><rect x="5" y="5" width="2.4" height="14" rx="1.2" fill="currentColor" stroke="none" /></symbol>
      <symbol id="i-next" viewBox="0 0 24 24"><path d="M5 5.5v13a.8.8 0 0 0 1.25.66L15 13a1.2 1.2 0 0 0 0-2L6.25 4.84A.8.8 0 0 0 5 5.5z" fill="currentColor" stroke="none" /><rect x="16.6" y="5" width="2.4" height="14" rx="1.2" fill="currentColor" stroke="none" /></symbol>
      <symbol id="i-shuffle" viewBox="0 0 24 24"><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="m4 4 5 5" /></symbol>
      <symbol id="i-repeat" viewBox="0 0 24 24"><path d="m17 1 4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="m7 23-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></symbol>
      <symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></symbol>
      <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></symbol>
      <symbol id="i-headphones" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></symbol>
    </svg>
  );
}

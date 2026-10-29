import type { CSSProperties } from "react";

/**
 * Typed helper for inline CSS custom properties.
 * Most of the visual work lives in the stylesheets; components only hand them
 * the data they need (a hue, a width, a stagger index) through variables.
 */
export type CssVars = Record<`--${string}`, string | number>;

export const cssVars = (vars: CssVars): CSSProperties => vars as CSSProperties;

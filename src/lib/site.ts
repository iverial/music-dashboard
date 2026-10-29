/**
 * Canonical site URL, used for metadata, sitemap, robots and structured data.
 * Set NEXT_PUBLIC_SITE_URL to override it. On Vercel it falls back to the
 * production domain that the platform injects at build time.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE = {
  name: "Wavelength",
  title: "Wavelength: animated top tracks dashboard (UI showcase)",
  description:
    "A dark, animated music top-charts dashboard built with Next.js, TypeScript and modern CSS to showcase frontend craft. Fictional data, nothing is monetized.",
  keywords: [
    "music dashboard",
    "top tracks dashboard",
    "Next.js portfolio project",
    "CSS animations",
    "frontend showcase",
    "dark UI",
    "React",
    "TypeScript",
  ],
  repo: "https://github.com/iverial/music-dashboard",
  author: {
    name: "Ivan Caggiano",
    portfolio: "https://porfolio-ivan-caggiano.vercel.app/",
    github: "https://github.com/iverial",
    linkedin: "https://www.linkedin.com/in/ivan-caggiano/",
  },
} as const;

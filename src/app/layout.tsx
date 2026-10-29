import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { IconSprite } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { SITE, SITE_URL } from "@/lib/site";
import "@/styles";

// Self-hosted by next/font: no request to Google at runtime, no layout shift.
// No `weight` list, so it ships the single variable font file instead of one per weight.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author.name, url: SITE.author.portfolio }],
  creator: SITE.author.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <IconSprite />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}

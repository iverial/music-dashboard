import { SITE, SITE_URL } from "@/lib/site";

/** Structured data (schema.org) so search engines understand what the page is and who made it */
export function JsonLd() {
  const authorId = `${SITE_URL}/#author`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": authorId },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern browser with CSS cascade layers and container queries",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        author: { "@id": authorId },
        isBasedOn: { "@id": `${SITE_URL}/#source` },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#source`,
        name: "music-dashboard",
        codeRepository: SITE.repo,
        programmingLanguage: ["TypeScript", "CSS"],
        runtimePlatform: "Next.js",
        author: { "@id": authorId },
      },
      {
        "@type": "Person",
        "@id": authorId,
        name: SITE.author.name,
        url: SITE.author.portfolio,
        sameAs: [SITE.author.github, SITE.author.linkedin],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

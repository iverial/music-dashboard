import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        Design demo with fictional data · Built by{" "}
        <a href={SITE.author.portfolio}>{SITE.author.name}</a>
      </span>
      <nav aria-label="Links">
        <a href={SITE.repo} target="_blank" rel="noreferrer noopener">
          Source on GitHub
        </a>
        {" · "}
        <a href={SITE.author.linkedin} target="_blank" rel="noreferrer noopener">
          LinkedIn
        </a>
      </nav>
    </footer>
  );
}

import { SITE } from "@/lib/site";
import { Icon } from "./Icon";

const STACK = [
  "Next.js App Router",
  "TypeScript",
  "Server Components",
  "Cascade layers",
  "@property animations",
  "Container queries",
  ":has() selectors",
  "View transitions",
  "Conic and radial gradients",
  "color-mix() and oklch()",
  "CSS counters",
  "CSS masks",
  "Zero UI dependencies",
];

/** Server component: static content, no client JavaScript */
export function About() {
  return (
    <section className="card about" id="about" aria-labelledby="about-title">
      <div className="about__copy">
        <p className="eyebrow">About this project</p>
        <h2 id="about-title">A showcase, not a product.</h2>
        <p>
          Wavelength is a visual exercise to show frontend and CSS craft. It <strong>does not monetize anything</strong>, it is not a
          real service, it plays no audio and it has no relation with Spotify or any streaming company: it only borrows the dark
          and green look everybody knows. Artists, tracks, covers and numbers are fictional, and every cover is drawn with CSS
          gradients.
        </p>
        <p>
          Designed and built by <a href={SITE.author.portfolio}>{SITE.author.name}</a>. Most of the visual work is hand-written CSS;
          React and TypeScript handle the state, the player and the data.
        </p>
        <a className="btn btn--primary" href={SITE.repo} target="_blank" rel="noreferrer noopener">
          <Icon name="code" />
          View the source
        </a>
      </div>

      <ul className="about__tags" aria-label="What this project uses">
        {STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

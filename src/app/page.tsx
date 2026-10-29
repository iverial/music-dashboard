import { About } from "@/components/About";
import { Dashboard } from "@/components/Dashboard";
import { Playlists } from "@/components/Playlists";
import { SiteFooter } from "@/components/SiteFooter";
import { VIEWS } from "@/data/build";

// Statically generated at build time: the full dashboard is in the initial HTML,
// so crawlers and link previews see real content, not an empty shell.
export default function Home() {
  return <Dashboard views={VIEWS} playlists={<Playlists />} about={<About />} footer={<SiteFooter />} />;
}

import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name}: animated top tracks dashboard, a Next.js and CSS showcase`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BARS = [38, 78, 54, 100];

/** Social preview (Open Graph + Twitter), generated at build time */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ffffff",
          background: "linear-gradient(135deg, #0b2a1a 0%, #090909 52%, #1a1238 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: 76,
              height: 76,
              padding: 16,
              borderRadius: 22,
              background: "linear-gradient(135deg, #1ed760, #00d4b1)",
            }}
          >
            {BARS.map((height, index) => (
              <div
                key={index}
                style={{
                  width: 9,
                  height: `${height}%`,
                  marginLeft: index === 0 ? 0 : 4,
                  borderRadius: 4,
                  background: "#04130a",
                }}
              />
            ))}
          </div>
          <div style={{ marginLeft: 24, fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.02, letterSpacing: -4 }}>Top tracks, animated.</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#b3b3b3" }}>
            A Next.js, TypeScript and modern CSS showcase. Fictional data.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {["Next.js", "TypeScript", "CSS"].map((label) => (
              <div
                key={label}
                style={{
                  marginRight: 14,
                  padding: "10px 22px",
                  borderRadius: 999,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#1ed760",
                  border: "2px solid rgba(30, 215, 96, 0.45)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 28, color: "#b3b3b3" }}>{`by ${SITE.author.name}`}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

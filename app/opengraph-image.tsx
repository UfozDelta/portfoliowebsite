import { ImageResponse } from "next/og";

export const alt = "Maksym Syagrovskyy - Math, Stats & CS Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 88, fontWeight: 600, letterSpacing: -2 }}>
          Maksym Syagrovskyy
          <div style={{ width: 44, height: 80, marginLeft: 18, background: "#0066ff" }} />
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#666666" }}>
          Math, stats &amp; computer science at the University of Toronto
        </div>
      </div>
    ),
    size,
  );
}

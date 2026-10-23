import { ImageResponse } from "next/og";
import { getProject } from "@/lib/data";

export const alt = "Project by Maksym Syagrovskyy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 96,
          background: "#ffffff",
          color: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#666666" }}>Maksym Syagrovskyy</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 92, fontWeight: 600, letterSpacing: -2 }}>
            {project?.title ?? "Project"}
            <div style={{ width: 44, height: 80, marginLeft: 18, background: "#0066ff" }} />
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#666666", maxWidth: 900 }}>
            {project?.description ?? ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

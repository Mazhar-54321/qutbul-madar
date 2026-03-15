import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Qutbul Madar - Sacred Sufi Shrine at Makanpur Shareef";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#1a3d2b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 80px",
        position: "relative",
      }}
    >
      {/* Top green border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "#2d7a4f",
          display: "flex",
        }}
      />

      {/* Bottom green border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "#2d7a4f",
          display: "flex",
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            width: 36,
            height: 2,
            background: "#4aa06a",
            display: "flex",
          }}
        />
        <div
          style={{
            color: "#4aa06a",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Makanpur Shareef · Est. 12th Century
        </div>
        <div
          style={{
            width: 36,
            height: 2,
            background: "#4aa06a",
            display: "flex",
          }}
        />
      </div>

      {/* ── HEADLINE ── */}
      <div
        style={{
          color: "#f7f4ee",
          fontSize: 78,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.05,
          marginBottom: 16,
          letterSpacing: "-0.02em",
        }}
      >
        Qutbul Madar
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "rgba(247,244,238,0.65)",
          fontSize: 28,
          textAlign: "center",
          lineHeight: 1.4,
          marginBottom: 36,
        }}
      >
        Sacred Sufi Shrine & Islamic Heritage of the Subcontinent
      </div>

      {/* Divider */}
      <div
        style={{
          width: 56,
          height: 3,
          background: "#2d7a4f",
          borderRadius: 99,
          marginBottom: 32,
          display: "flex",
        }}
      />

      {/* Stats */}
      <div style={{ display: "flex", gap: 56, marginBottom: 40 }}>
        {[
          { num: "800+", label: "Years of Legacy" },
          { num: "596", label: "Years of Life" },
          { num: "4", label: "Languages" },
        ].map(({ num, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#4aa06a", fontSize: 34, fontWeight: 800 }}>
              {num}
            </div>
            <div
              style={{
                color: "rgba(247,244,238,0.4)",
                fontSize: 15,
                marginTop: 4,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA BUTTON ── */}
      <div
        style={{
          background: "#2d7a4f",
          color: "#f7f4ee",
          fontSize: 20,
          fontWeight: 700,
          padding: "14px 40px",
          borderRadius: 50,
          letterSpacing: "0.04em",
          display: "flex",
        }}
      >
        Explore History & Services →
      </div>

      {/* Domain */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          color: "rgba(247,244,238,0.3)",
          fontSize: 16,
          letterSpacing: "0.08em",
          display: "flex",
        }}
      >
        qutbul-madar.in
      </div>
    </div>,
    { ...size },
  );
}

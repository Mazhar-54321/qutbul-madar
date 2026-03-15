import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Qutbul Madar - Sacred Heritage of the Subcontinent";
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
        padding: "60px 80px",
        position: "relative",
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "#2d7a4f",
          display: "flex",
        }}
      />

      {/* Decorative bottom border */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "#2d7a4f",
          display: "flex",
        }}
      />

      {/* Eyebrow tag */}
      <div
        style={{
          color: "#4aa06a",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 2,
            background: "#4aa06a",
            display: "flex",
          }}
        />
        Makanpur Shareef · Est. 12th Century
        <div
          style={{
            width: 40,
            height: 2,
            background: "#4aa06a",
            display: "flex",
          }}
        />
      </div>

      {/* Main title */}
      <div
        style={{
          color: "#f7f4ee",
          fontSize: 80,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.05,
          marginBottom: 20,
          letterSpacing: "-0.02em",
        }}
      >
        Qutbul Madar
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "rgba(247,244,238,0.6)",
          fontSize: 30,
          textAlign: "center",
          lineHeight: 1.5,
          marginBottom: 48,
          maxWidth: 700,
        }}
      >
        Sacred Heritage of the Subcontinent
      </div>

      {/* Divider */}
      <div
        style={{
          width: 60,
          height: 3,
          background: "#2d7a4f",
          borderRadius: 99,
          marginBottom: 36,
          display: "flex",
        }}
      />

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
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
            <div style={{ color: "#4aa06a", fontSize: 36, fontWeight: 800 }}>
              {num}
            </div>
            <div
              style={{
                color: "rgba(247,244,238,0.4)",
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Domain */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          color: "rgba(247,244,238,0.35)",
          fontSize: 18,
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

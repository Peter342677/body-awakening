import { ImageResponse } from "next/og";

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
          alignItems: "flex-start",
          padding: "80px",
          backgroundImage:
            "linear-gradient(105deg, #BF7040 0%, #CDA45C 45%, #63498A 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 999,
            background: "rgba(251,247,243,0.16)",
            marginBottom: 40,
            fontSize: 52,
          }}
        >
          🕊
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#FBF7F3",
            letterSpacing: "-1px",
          }}
        >
          Body Awakening
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#F0EBE6",
          }}
        >
          Massage Therapy &amp; Life &amp; Spiritual Coaching with Jason Gentrup
        </div>
      </div>
    ),
    { ...size }
  );
}

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
            "linear-gradient(105deg, #B85667 0%, #9A5F92 52%, #7458A6 100%)",
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
            background: "rgba(251,246,244,0.16)",
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
            color: "#FBF6F4",
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
            color: "#F3E9EA",
          }}
        >
          Massage Therapy &amp; Somatic Coaching with Jason Gentrup
        </div>
      </div>
    ),
    { ...size }
  );
}

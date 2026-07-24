import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Body Awakening <onboarding@resend.dev>",
          to: process.env.CONTACT_TO_EMAIL ?? parsed.data.email,
          subject: "New newsletter signup",
          text: `New signup: ${parsed.data.email}`,
        }),
      });
    } catch {
      // Fail soft: signup still counts as received.
    }
  }

  return NextResponse.json({ ok: true });
}

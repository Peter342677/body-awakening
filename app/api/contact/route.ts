import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Body Awakening <onboarding@resend.dev>",
          to,
          reply_to: parsed.data.email,
          subject: `[Contact] ${parsed.data.subject}`,
          text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
        }),
      });
    } catch {
      // Fail soft: the message is still acknowledged to the sender.
    }
  } else {
    console.log("Contact form submission (RESEND_API_KEY not set):", parsed.data);
  }

  return NextResponse.json({ ok: true });
}

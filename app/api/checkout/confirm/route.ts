import { NextResponse } from "next/server";
import { getStripe, stripeEnabled } from "@/lib/stripe";

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_") || !stripeEnabled) {
    return NextResponse.json({ found: false });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const meta = session.metadata ?? {};
    return NextResponse.json({
      found: true,
      paymentType: meta.paymentType ?? "full",
      chargeAmount: meta.chargeAmount ? Number(meta.chargeAmount) : null,
      fullPrice: meta.fullPrice ? Number(meta.fullPrice) : null,
      paymentNote: meta.paymentNote ?? null,
    });
  } catch {
    return NextResponse.json({ found: false });
  }
}

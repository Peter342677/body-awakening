import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { createCalendarEvent } from "@/lib/calendar";
import { SERVICES } from "@/lib/services";

export async function POST(req: Request) {
  if (!stripeEnabled || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 501 });
  }

  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig ?? "",
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};
    const service = SERVICES.find((s) => s.slug === meta.serviceSlug);

    if (service && meta.date && meta.time) {
      try {
        await createCalendarEvent({
          serviceName: service.name,
          durationMinutes: Number(meta.durationMinutes) || 60,
          date: meta.date,
          time: meta.time,
          clientName: meta.name || "Client",
          clientEmail: session.customer_email ?? "",
          clientPhone: meta.phone,
          notes: meta.notes,
        });
      } catch (err) {
        console.error("Failed to create calendar event for paid booking:", err);
      }
    }

    // Send confirmation emails here once RESEND_API_KEY is supplied.
    console.log("Booking confirmed:", meta);
  }

  return NextResponse.json({ received: true });
}

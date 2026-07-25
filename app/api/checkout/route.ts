import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { createCalendarEvent, calendarEnabled } from "@/lib/calendar";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

const schema = z.object({
  serviceSlug: z.string(),
  durationMinutes: z.number(),
  date: z.string(),
  time: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
  }

  const { serviceSlug, durationMinutes, date, time, name, email, phone, notes } = parsed.data;
  const service = SERVICES.find((s) => s.slug === serviceSlug);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const durationOption = service.durations.find((d) => d.minutes === durationMinutes);
  if (!durationOption) {
    return NextResponse.json({ error: "Invalid duration for this service" }, { status: 400 });
  }

  if (!stripeEnabled) {
    // Demo mode: confirm the booking immediately without a real charge.
    const bookingId = crypto.randomUUID();

    if (calendarEnabled) {
      try {
        await createCalendarEvent({
          serviceName: service.name,
          durationMinutes: durationOption.minutes,
          date,
          time,
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          notes,
        });
      } catch (err) {
        console.error("Failed to create calendar event for demo booking:", err);
      }
    }

    return NextResponse.json({
      mock: true,
      bookingId,
      redirectUrl: `/book?confirmed=${bookingId}`,
    });
  }

  const stripe = getStripe();
  const cents = durationOption.price * 100;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: cents,
          product_data: {
            name: `${service.name} (${durationOption.label}, ${date} at ${time})`,
          },
        },
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: {
      serviceSlug,
      durationMinutes: String(durationMinutes),
      date,
      time,
      name,
      phone: phone ?? "",
      notes: notes ?? "",
    },
    success_url: `${SITE_URL}/book?confirmed={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/book`,
  });

  return NextResponse.json({ mock: false, redirectUrl: session.url });
}

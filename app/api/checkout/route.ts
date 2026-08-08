import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe, stripeEnabled } from "@/lib/stripe";
import { createCalendarEvent, calendarEnabled } from "@/lib/calendar";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";

const MIN_DEPOSIT_RATE = 0.2;

const schema = z.object({
  serviceSlug: z.string(),
  durationMinutes: z.number(),
  date: z.string(),
  time: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  paymentType: z.enum(["full", "deposit"]).default("full"),
  depositAmount: z.number().positive().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
  }

  const {
    serviceSlug,
    durationMinutes,
    date,
    time,
    name,
    email,
    phone,
    notes,
    paymentType,
    depositAmount,
  } = parsed.data;
  const service = SERVICES.find((s) => s.slug === serviceSlug);
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const durationOption = service.durations.find((d) => d.minutes === durationMinutes);
  if (!durationOption) {
    return NextResponse.json({ error: "Invalid duration for this service" }, { status: 400 });
  }

  const fullPrice = durationOption.price;
  const minDeposit = Math.ceil(fullPrice * MIN_DEPOSIT_RATE);

  let chargeAmount = fullPrice;
  let paymentNote = `Paid in full ($${fullPrice}).`;

  if (paymentType === "deposit") {
    // Server-side floor is authoritative; never trust the client's own math on a charge amount.
    if (
      depositAmount === undefined ||
      !Number.isFinite(depositAmount) ||
      Math.round(depositAmount * 100) / 100 !== depositAmount ||
      depositAmount < minDeposit ||
      depositAmount > fullPrice
    ) {
      return NextResponse.json(
        { error: `Deposit must be between $${minDeposit} and $${fullPrice}.` },
        { status: 400 }
      );
    }
    chargeAmount = depositAmount;
    const balance = Math.round((fullPrice - depositAmount) * 100) / 100;
    paymentNote = `$${depositAmount} deposit paid. $${balance} balance due at session.`;
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
          paymentNote,
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
  const cents = Math.round(chargeAmount * 100);
  const productName =
    paymentType === "deposit"
      ? `${service.name} deposit (${durationOption.label}, ${date} at ${time})`
      : `${service.name} (${durationOption.label}, ${date} at ${time})`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: cents,
          product_data: {
            name: productName,
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
      paymentType,
      chargeAmount: String(chargeAmount),
      fullPrice: String(fullPrice),
      paymentNote,
    },
    success_url: `${SITE_URL}/book?confirmed={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/book`,
  });

  return NextResponse.json({ mock: false, redirectUrl: session.url });
}

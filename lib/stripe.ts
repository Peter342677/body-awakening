import Stripe from "stripe";

export const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function parsePriceToCents(price: string): number | null {
  const match = price.match(/(\d+(\.\d{1,2})?)/);
  if (!match) return null;
  return Math.round(parseFloat(match[1]) * 100);
}

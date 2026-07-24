import { NextResponse } from "next/server";
import { getAvailableDays, calendarEnabled } from "@/lib/calendar";

export async function GET() {
  const days = await getAvailableDays();
  return NextResponse.json({ days, live: calendarEnabled });
}

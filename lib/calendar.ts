import availability from "@/content/availability.json";

export type DaySlots = { date: string; label: string; slots: string[] };

export const calendarEnabled = Boolean(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_ID
);

const TIMEZONE = "Pacific/Honolulu";

// Hosting env-var UIs frequently mangle a raw multi-line PEM key (escaped \n
// sequences get dropped or double-escaped in transit), so accept a base64-encoded
// key as well and decode it — base64 has no characters for that process to corrupt.
function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return raw;
  const unescaped = raw.replace(/\\n/g, "\n");
  if (unescaped.includes("BEGIN PRIVATE KEY")) return unescaped;
  try {
    const decoded = Buffer.from(raw, "base64").toString("utf-8");
    if (decoded.includes("BEGIN PRIVATE KEY")) return decoded;
  } catch {
    // fall through to returning the unescaped raw value below
  }
  return unescaped;
}

async function getCalendarClient() {
  const { google } = await import("googleapis");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY),
    // Read availability and write confirmed bookings from the same service account.
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

async function getBusyRanges(timeMin: string, timeMax: string) {
  if (!calendarEnabled) return [];
  const calendar = await getCalendarClient();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });
  const calId = process.env.GOOGLE_CALENDAR_ID as string;
  return res.data.calendars?.[calId]?.busy ?? [];
}

const HONOLULU_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Hawaii-Aleutian Standard Time does not observe DST, so this offset is fixed year-round.
const HONOLULU_UTC_OFFSET_HOURS = 10;

/** Reads a date's calendar day, weekday, and display label as seen in Honolulu, regardless of server timezone. */
function honoluluDateParts(date: Date) {
  const isoDate = date.toLocaleDateString("en-CA", { timeZone: TIMEZONE });
  const weekdayShort = date.toLocaleDateString("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
  });
  const label = date.toLocaleDateString("en-US", {
    timeZone: TIMEZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return { isoDate, weekdayIndex: HONOLULU_WEEKDAYS.indexOf(weekdayShort), label };
}

function honoluluWallClockToUTC(isoDate: string, hh: number, mm: number): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh + HONOLULU_UTC_OFFSET_HOURS, mm));
}

export async function getAvailableDays(): Promise<DaySlots[]> {
  const days: DaySlots[] = [];
  const now = new Date();
  const busy = calendarEnabled
    ? await getBusyRanges(
        now.toISOString(),
        new Date(
          now.getTime() + availability.daysAhead * 24 * 60 * 60 * 1000
        ).toISOString()
      )
    : [];

  for (let i = 1; i <= availability.daysAhead; i++) {
    const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const { isoDate, weekdayIndex, label } = honoluluDateParts(date);
    if (availability.unavailableWeekdays.includes(weekdayIndex)) continue;

    const slots = availability.slotsPerDay.filter((time) => {
      if (!busy.length) return true;
      const { hh, mm } = to24Hour(time);
      const slotDate = honoluluWallClockToUTC(isoDate, hh, mm);
      return !busy.some((b) => {
        if (!b.start || !b.end) return false;
        return slotDate >= new Date(b.start) && slotDate < new Date(b.end);
      });
    });

    if (slots.length) days.push({ date: isoDate, label, slots });
    if (days.length >= 7) break;
  }

  return days;
}

function to24Hour(time: string): { hh: number; mm: number } {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return { hh: 9, mm: 0 };
  let hh = parseInt(match[1], 10);
  const mm = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hh !== 12) hh += 12;
  if (period === "AM" && hh === 12) hh = 0;
  return { hh, mm };
}

function addMinutes(hh: number, mm: number, duration: number) {
  const total = hh * 60 + mm + duration;
  return { hh: Math.floor(total / 60) % 24, mm: total % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

export async function createCalendarEvent({
  serviceName,
  durationMinutes,
  date,
  time,
  clientName,
  clientEmail,
  clientPhone,
  notes,
}: {
  serviceName: string;
  durationMinutes: number;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
}) {
  if (!calendarEnabled) return null;

  const start = to24Hour(time);
  const end = addMinutes(start.hh, start.mm, durationMinutes);
  const startDateTime = `${date}T${pad(start.hh)}:${pad(start.mm)}:00`;
  const endDateTime = `${date}T${pad(end.hh)}:${pad(end.mm)}:00`;

  const calendar = await getCalendarClient();
  const res = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID as string,
    // A bare service account (no Google Workspace domain-wide delegation) cannot invite
    // attendees or send updates on a personal Gmail calendar — inserting a plain event
    // still works, and client details are captured in the description below instead.
    requestBody: {
      summary: `${serviceName} with ${clientName}`,
      description: [
        `Client: ${clientName}`,
        `Email: ${clientEmail}`,
        clientPhone && `Phone: ${clientPhone}`,
        notes && `Notes: ${notes}`,
      ]
        .filter(Boolean)
        .join("\n"),
      start: { dateTime: startDateTime, timeZone: TIMEZONE },
      end: { dateTime: endDateTime, timeZone: TIMEZONE },
    },
  });

  return { id: res.data.id, htmlLink: res.data.htmlLink };
}

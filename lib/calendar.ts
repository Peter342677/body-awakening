import availability from "@/content/availability.json";

export type DaySlots = { date: string; label: string; slots: string[] };

export const calendarEnabled = Boolean(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
    process.env.GOOGLE_CALENDAR_ID
);

const TIMEZONE = "Pacific/Honolulu";

async function getCalendarClient() {
  const { google } = await import("googleapis");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    if (availability.unavailableWeekdays.includes(date.getDay())) continue;

    const isoDate = date.toISOString().slice(0, 10);
    const label = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const slots = availability.slotsPerDay.filter((time) => {
      if (!busy.length) return true;
      const slotDate = new Date(`${isoDate} ${time}`);
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

/** Reads the largest number out of a duration string like "60 / 90 min", capped to the slot spacing. */
export function parseDurationMinutes(duration: string): number {
  const nums = [...duration.matchAll(/\d+/g)].map((m) => parseInt(m[0], 10));
  if (!nums.length) return 60;
  return Math.min(Math.max(...nums), 90);
}

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
    sendUpdates: "all",
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
      attendees: clientEmail ? [{ email: clientEmail, displayName: clientName }] : undefined,
    },
  });

  return { id: res.data.id, htmlLink: res.data.htmlLink };
}

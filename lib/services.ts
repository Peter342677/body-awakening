export type DurationOption = { minutes: number; label: string; price: number };

export type Service = {
  slug: string;
  name: string;
  hub: "massage" | "coaching";
  durations: DurationOption[];
  description: string;
};

export const SERVICES: Service[] = [
  {
    slug: "reiki-energy-work",
    name: "Reiki & Energy Work",
    hub: "massage",
    durations: [
      { minutes: 60, label: "60 min", price: 125 },
      { minutes: 90, label: "90 min", price: 165 },
    ],
    description:
      "A gentle, hands-on (or hands-near) practice that works with the body's energy to calm the nervous system, ease stress, and restore a sense of flow.",
  },
  {
    slug: "craniosacral-therapy",
    name: "Craniosacral Therapy",
    hub: "massage",
    durations: [
      { minutes: 60, label: "60 min", price: 125 },
      { minutes: 90, label: "90 min", price: 165 },
    ],
    description:
      "A light-touch approach that follows the subtle rhythm of the craniosacral system to ease tension, headaches, and the residue of stress held in the body.",
  },
  {
    slug: "lymphatic-drainage",
    name: "Lymphatic Drainage",
    hub: "massage",
    durations: [
      { minutes: 45, label: "45 min", price: 125 },
      { minutes: 60, label: "60 min", price: 125 },
    ],
    description:
      "A precise, feather-light technique that encourages the movement of lymph, reduces swelling, and supports recovery.",
  },
  {
    slug: "distant-healing",
    name: "Distant Healing",
    hub: "massage",
    durations: [{ minutes: 60, label: "60 min", price: 125 }],
    description:
      "A focused, intentional energy-work practice held remotely to support relaxation, balance, and wellbeing wherever you are.",
  },
  {
    slug: "spiritual-coaching",
    name: "Spiritual Coaching",
    hub: "coaching",
    durations: [{ minutes: 60, label: "60 min", price: 70 }],
    description:
      "Exploring meaning, connection, and your relationship to something larger through direct experience and honest inquiry.",
  },
  {
    slug: "life-coaching",
    name: "Life Coaching",
    hub: "coaching",
    durations: [{ minutes: 60, label: "60 min", price: 70 }],
    description:
      "For the crossroads moments: clarifying what matters, naming what's in the way, and charting a path you can actually walk.",
  },
  {
    slug: "wellness-coaching",
    name: "Wellness Coaching",
    hub: "coaching",
    durations: [{ minutes: 60, label: "60 min", price: 70 }],
    description:
      "A whole-person approach to feeling well: sleep, stress, movement, nourishment, and nervous-system regulation.",
  },
  {
    slug: "performance-coaching",
    name: "Performance Coaching",
    hub: "coaching",
    durations: [{ minutes: 60, label: "60 min", price: 70 }],
    description:
      "Training the ability to stay grounded under pressure and perform from a regulated, connected state rather than sheer force.",
  },
];

export const getServicesByHub = (hub: Service["hub"]) =>
  SERVICES.filter((s) => s.hub === hub);

export const formatDuration = (s: Service) =>
  s.durations.map((d) => d.label).join(" / ");

export const formatPrice = (s: Service) => {
  const uniquePrices = [...new Set(s.durations.map((d) => d.price))];
  return uniquePrices.map((p) => `$${p}`).join(" / ");
};

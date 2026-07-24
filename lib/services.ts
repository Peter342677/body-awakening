export type Service = {
  slug: string;
  name: string;
  hub: "massage" | "coaching";
  duration: string;
  price: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    slug: "reiki-energy-work",
    name: "Reiki & Energy Work",
    hub: "massage",
    duration: "60 / 90 min",
    price: "⟨PRICE⟩",
    description:
      "A gentle, hands-on (or hands-near) practice that works with the body's energy to calm the nervous system, ease stress, and restore a sense of flow.",
  },
  {
    slug: "craniosacral-therapy",
    name: "Craniosacral Therapy",
    hub: "massage",
    duration: "60 / 90 min",
    price: "⟨PRICE⟩",
    description:
      "A light-touch approach that follows the subtle rhythm of the craniosacral system to ease tension, headaches, and the residue of stress held in the body.",
  },
  {
    slug: "lymphatic-drainage",
    name: "Lymphatic Drainage",
    hub: "massage",
    duration: "45 / 60 min",
    price: "⟨PRICE⟩",
    description:
      "A precise, feather-light technique that encourages the movement of lymph, reduces swelling, and supports recovery.",
  },
  {
    slug: "distant-healing",
    name: "Distant Healing",
    hub: "massage",
    duration: "30 / 60 min",
    price: "⟨PRICE⟩",
    description:
      "A focused, intentional energy-work practice held remotely to support relaxation, balance, and wellbeing wherever you are.",
  },
  {
    slug: "spiritual-coaching",
    name: "Spiritual Coaching",
    hub: "coaching",
    duration: "60 min",
    price: "⟨PRICE⟩",
    description:
      "Exploring meaning, connection, and your relationship to something larger through direct experience and honest inquiry.",
  },
  {
    slug: "wellness-coaching",
    name: "Wellness Coaching",
    hub: "coaching",
    duration: "60 min",
    price: "⟨PRICE⟩",
    description:
      "A whole-person approach to feeling well: sleep, stress, movement, nourishment, and nervous-system regulation.",
  },
  {
    slug: "life-coaching",
    name: "Life Coaching",
    hub: "coaching",
    duration: "60 min",
    price: "⟨PRICE⟩",
    description:
      "For the crossroads moments: clarifying what matters, naming what's in the way, and charting a path you can actually walk.",
  },
  {
    slug: "performance-somatic-coaching",
    name: "Performance & Somatic Coaching",
    hub: "coaching",
    duration: "60 min",
    price: "⟨PRICE⟩",
    description:
      "Rooted in somatic awareness, training the ability to stay grounded under pressure and perform from a regulated, connected state.",
  },
];

export const getServicesByHub = (hub: Service["hub"]) =>
  SERVICES.filter((s) => s.hub === hub);

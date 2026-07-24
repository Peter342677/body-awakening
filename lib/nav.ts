export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Coaching", href: "/services/coaching" },
      { label: "Massage Therapy", href: "/services/massage" },
    ],
  },
  { label: "The Human Compass", href: "/the-human-compass" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

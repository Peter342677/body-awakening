export const EASE_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)" as const;

export const DURATION = {
  hover: 0.3,
  reveal: 0.9,
  hero: 1.1,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

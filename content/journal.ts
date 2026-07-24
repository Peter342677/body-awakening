export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string[];
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "why-the-body-is-the-guide",
    title: "Why the body is the guide, not the problem",
    excerpt:
      "Most of us treat the body as something to manage or override. What changes when we treat it as the thing that already knows the way?",
    date: "2026-04-02",
    body: [
      "Most of us live a step removed from our own bodies. We push through tension, override exhaustion, and carry stress we can no longer name.",
      "On the table, the pattern is always the same: the body has been trying to say something for a long time before anyone finally stops to listen.",
      "This is the premise Body Awakening is built on: the body is not the problem to be fixed. It is the guide.",
    ],
  },
  {
    slug: "what-craniosacral-work-actually-does",
    title: "What craniosacral work actually does",
    excerpt:
      "A light-touch modality that follows the subtlest rhythm in the body, and why that subtlety is the point.",
    date: "2026-05-14",
    body: [
      "Craniosacral therapy is easy to misunderstand because so little seems to happen from the outside.",
      "The work follows the rhythm of the fluid and membranes surrounding the brain and spinal cord, a rhythm most people have never been taught to notice in themselves.",
      "Releasing restrictions here can ease tension, headaches, and the residue of stress the body has been holding for years.",
    ],
  },
];

export const getJournalPost = (slug: string) =>
  JOURNAL_POSTS.find((p) => p.slug === slug);

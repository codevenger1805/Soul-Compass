// Sample data shaping the DEV DIARY experience.
// In production, this is replaced by Cloud-backed queries.

export type Entry = {
  id: string;
  date: string;   // ISO
  dateLabel: string;
  title: string;
  excerpt: string;
  mood: "Calm" | "Radiant" | "Heavy" | "Curious" | "Tender" | "Focused";
  energy: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  chapter: string;
  hue: "indigo" | "emerald" | "amber" | "violet";
};

export const entries: Entry[] = [
  {
    id: "e1",
    date: "2026-06-18",
    dateLabel: "Today",
    title: "The first funding round jitters",
    excerpt: "Remembering why I started this instead of taking the safe corporate role. The fear is loud, but quieter than the regret would be.",
    mood: "Focused",
    energy: 4,
    tags: ["startup", "fear", "purpose"],
    chapter: "The Early Startup Years",
    hue: "indigo",
  },
  {
    id: "e2",
    date: "2026-06-16",
    dateLabel: "Tue",
    title: "Long walk through the old neighbourhood",
    excerpt: "Passed the bakery we used to go to on Sundays. Felt the strange comfort of being older than I was the last time I stood there.",
    mood: "Tender",
    energy: 2,
    tags: ["memory", "city", "family"],
    chapter: "The Early Startup Years",
    hue: "amber",
  },
  {
    id: "e3",
    date: "2026-06-12",
    dateLabel: "Fri",
    title: "Moving into the new studio",
    excerpt: "The light hits the desk at 4 PM exactly. Peace found in geometry. Something about the room already feels like a chapter.",
    mood: "Calm",
    energy: 3,
    tags: ["space", "ritual"],
    chapter: "The Early Startup Years",
    hue: "emerald",
  },
  {
    id: "e4",
    date: "2026-06-05",
    dateLabel: "Jun 5",
    title: "Argument with M.",
    excerpt: "We were both right and both wrong. I notice I keep returning to the same shape of conflict — it's almost choreography by now.",
    mood: "Heavy",
    energy: 2,
    tags: ["relationships", "pattern"],
    chapter: "The Early Startup Years",
    hue: "violet",
  },
  {
    id: "e5",
    date: "2026-05-29",
    dateLabel: "May 29",
    title: "The conference talk that didn't bomb",
    excerpt: "An older engineer told me after: 'you spoke like someone who has actually built something'. I'm sitting with that.",
    mood: "Radiant",
    energy: 5,
    tags: ["work", "recognition"],
    chapter: "The Early Startup Years",
    hue: "emerald",
  },
  {
    id: "e6",
    date: "2026-05-20",
    dateLabel: "May 20",
    title: "Mom called, no reason",
    excerpt: "Just wanted to know how the project was going. I forget how rare an unprompted check-in becomes once you cross 30.",
    mood: "Tender",
    energy: 3,
    tags: ["family"],
    chapter: "The Early Startup Years",
    hue: "amber",
  },
];

export const chapters = [
  { id: "c1", name: "The Early Startup Years", range: "Jan 2026 — Now", count: 47, hue: "indigo" },
  { id: "c2", name: "After Berlin", range: "Aug 2025 — Dec 2025", count: 62, hue: "amber" },
  { id: "c3", name: "The Quiet Year", range: "2024", count: 184, hue: "emerald" },
  { id: "c4", name: "Graduate Studies", range: "2022 — 2023", count: 311, hue: "violet" },
] as const;

export const insights = [
  {
    label: "Recurring theme",
    title: "Solitude as a creative input, not a problem to fix",
    detail: "Appears in 18 entries over 6 weeks. Strongest correlation with high-energy reflections.",
  },
  {
    label: "Quiet pattern",
    title: "You write more honestly after long walks",
    detail: "Reflection depth scores rise 34% on days containing a walk longer than 30 minutes.",
  },
  {
    label: "Growth signal",
    title: "Anger now resolves in 2 days, not 9",
    detail: "Compared to this period last year, you process heavy moods 4.5× faster.",
  },
];

export const futureLetters = [
  { id: "l1", to: "Future me in 6 months", preview: "I hope you remember that the version of you writing this was scared and still showed up…", arrival: "Dec 18, 2026" },
  { id: "l2", to: "Future me in 1 year", preview: "If the startup is still alive, throw a small party. If it isn't, throw a smaller one anyway…", arrival: "Jun 18, 2027" },
  { id: "l3", to: "Future me at 40", preview: "By now you've probably forgotten how loud your 30s felt. Don't be smug about it.", arrival: "2034" },
];

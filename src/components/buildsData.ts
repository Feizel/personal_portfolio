/**
 * Every build carries a state, because a portfolio that only ever says "2025"
 * is quietly claiming everything is still alive. ACTIVE is being worked on
 * now; PAUSED is stopped but not abandoned; ARCHIVED is finished or dropped
 * and kept as a record.
 */
import type { InkTone } from "./sketchContext";

export type BuildState = "ACTIVE" | "PAUSED" | "ARCHIVED";

export interface Build {
  slug: string;
  /** The pen this build is drawn in, so the index reads as four hands. */
  tone: InkTone;
  name: string;
  /** One line, for the index. */
  line: string;
  year: string;
  state: BuildState;
  /** Omitted where the tooling is not the point. */
  stack?: string[];
  image?: string;
  /** Live destination, when there is one. */
  href?: string;
  repo?: string;
  /** A written account elsewhere on the site, as a path. */
  post?: string;
  /** What I did on it. */
  role: string;
  /** The longer description, in the words it was first written in. */
  body: string[];
}

/**
 * Ephemeris leads, then the rest by state. Order is meaningful here: the
 * first thing is the thing I am actually doing.
 */
export const builds: Build[] = [
  {
    slug: "ephemeris",
    tone: "violet",
    name: "Ephemeris",
    line: "Stellar-physics methods pointed at five-minute binary options.",
    year: "2025",
    state: "ACTIVE",
    role: "Research and build",
    post: "/blog/polymarket-finance-algorithms",
    body: [
      "A system that applies techniques from stellar physics to 5-minute binary options on Polymarket. Not because crypto prediction markets are the most important problem in the world, but because they are a near-perfect laboratory: bounded time horizons, continuous price feeds, known resolution mechanics, and a market full of participants who mostly do not think in terms of Fokker-Planck equations.",
      "In astronomy, an ephemeris is a table of positions — where celestial bodies will be at specific times. The name felt right for a system that tries to predict where a price will be at a known future moment.",
      "Research in progress, and the write-up says so plainly. It is a log of what was built, what the math says, and what broke — not a pitch.",
    ],
  },
  {
    slug: "synera",
    tone: "blue",
    name: "Synera",
    line: "Talent mobility, modelled as paths rather than job titles.",
    year: "2025",
    state: "PAUSED",
    stack: ["React", "Node", "PostgreSQL", "AWS"],
    image: "/projects/synera-ai.png",
    role: "Design and build",
    body: [
      "A B2B talent mobility platform grown out of an earlier career-navigation concept: an engine that helps organisations map how people can move through them, based on experience, skills and interests rather than job titles.",
      "Paused. There is nothing to open yet, so there is no link here.",
    ],
  },
  {
    slug: "626-creative",
    tone: "rose",
    name: "626 Creative",
    line: "A studio site for a creative agency, shipped end to end.",
    year: "2024",
    state: "ARCHIVED",
    stack: ["React", "TypeScript", "Vercel"],
    image: "/projects/626-creative-agency.png",
    href: "https://www.626.co.za",
    role: "Design and build",
    body: [
      "A website built for 626 Creative Studio, a creative agency. Taken from brief to live site, including the parts nobody credits: content wrangling, responsive behaviour, and the deploy.",
    ],
  },
  {
    slug: "ai-blog-assistant",
    tone: "teal",
    name: "AI Blog Assistant",
    line: "A writing partner that argues with my drafts. Source is public.",
    year: "2024",
    state: "ARCHIVED",
    stack: ["Python", "OpenAI API", "Flask"],
    image: "/projects/ai-blog-assistant.png",
    href: "https://ai-blog-assistant.onrender.com",
    repo: "https://github.com/Feizel/AI-Blog-Assistant",
    role: "Build",
    body: [
      "A personal tool that uses a language model to help work out what to write about, and to push back on topics and angles before they turn into drafts.",
      "It is the smallest thing here and the one whose source is open, which makes it the easiest to actually judge me on.",
    ],
  },
];

export const bySlug = (slug?: string) => builds.find((b) => b.slug === slug);

export interface Experiment {
  slug: string;
  name: string;
  /** One line, for the index. */
  line: string;
  year: string;
  stack: string[];
  image?: string;
  /** Live destination, when there is one. */
  href?: string;
  repo?: string;
  /** Shown instead of a year when the thing is not finished. */
  status?: string;
  /** What I did on it. */
  role: string;
  /** The longer description, in the words it was first written in. */
  body: string[];
}

export const experiments: Experiment[] = [
  {
    slug: "ember",
    name: "Ember",
    line: "A private haptic channel for two people. Touch as a message.",
    year: "2025",
    stack: ["SwiftUI", "iOS", "CoreHaptics", "CloudKit"],
    image: "/projects/Ember.png",
    href: "https://atomus.co.za",
    role: "Design and build, at Atomus",
    body: [
      "A private, intentional mobile experience designed to help people feel closer through subtle interaction, memory, and touch. Built with emotional safety and trust at its core.",
      "Haptics are the whole interface. Most of the work was in restraint: deciding what not to send, and making a signal feel deliberate rather than like a notification.",
    ],
  },
  {
    slug: "blank",
    name: "Blank",
    line: "A physics playground you steer by tilting the phone.",
    year: "2025",
    stack: ["SwiftUI", "iOS", "CoreMotion", "Metal", "SpriteKit"],
    image: "/projects/Blank.png",
    href: "https://atomus.co.za",
    role: "Design and build, at Atomus",
    body: [
      "A minimalist physics playground that turns your iPhone into a living canvas. Fluid simulations, precise sensor input, and high-fidelity graphics create calm, responsive worlds with every tilt and motion.",
      "The device's own motion is the only control. Getting that to feel like weight rather than input lag is the entire problem.",
    ],
  },
  {
    slug: "synera",
    name: "Synera",
    line: "Talent mobility, modelled as paths rather than job titles.",
    year: "2025",
    stack: ["React", "Node", "PostgreSQL", "AWS"],
    image: "/projects/synera-ai.png",
    status: "In progress",
    role: "Design and build",
    body: [
      "A B2B talent mobility platform grown out of an earlier career-navigation concept: an engine that helps organisations map how people can move through them, based on experience, skills and interests rather than job titles.",
      "Still being built. There is nothing to open yet, so there is no link here.",
    ],
  },
  {
    slug: "atomus",
    name: "Atomus",
    line: "The studio site. The brief was to not look like everything else.",
    year: "2024",
    stack: ["React", "TypeScript", "Framer", "Figma", "Vercel"],
    image: "/projects/atomusdev.png",
    href: "https://atomusdev.co.za",
    role: "Co-founder, design and build",
    body: [
      "The site for Atomus, the studio I co-founded. It is where the engineering practice presents itself, so the brief was the hardest kind: no client to point at, and no excuse for looking like a template.",
    ],
  },
  {
    slug: "626-creative",
    name: "626 Creative",
    line: "A studio site for a creative agency, shipped end to end.",
    year: "2024",
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
    name: "AI Blog Assistant",
    line: "A writing partner that argues with my drafts. Source is public.",
    year: "2024",
    stack: ["Python", "OpenAI API", "Flask"],
    image: "/projects/ai-blog-assistant.png",
    href: "https://ai-blog-assistant.onrender.com",
    repo: "https://github.com/Feizel/AI-Blog-Assistant",
    role: "Build",
    body: [
      "A personal tool that uses a language model to help work out what to write about, and to push back on topics and angles before they turn into drafts.",
      "It is the smallest project here and the one whose source is open, which makes it the easiest to actually judge me on.",
    ],
  },
];

export const bySlug = (slug?: string) =>
  experiments.find((e) => e.slug === slug);

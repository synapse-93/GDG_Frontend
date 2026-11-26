export interface NavLinkItem {
  index: string;
  label: string;
  href: "/" | "/events" | "/team";
}

export interface CommunityLinkItem {
  id: "github" | "discord" | "linkedin" | "instagram" | "youtube";
  label: string;
  handle: string;
  description: string;
  href: string;
  accentColor: "blue" | "red" | "yellow" | "green";
}

export interface CommunityPillar {
  index: string;
  title: string;
  description: string;
  accentColor: "blue" | "red" | "yellow" | "green";
  geometryVariant: "cube" | "rings" | "diamond" | "hex";
}

export interface LatestRecapContent {
  eventSlug: string;
  eyebrow: string;
  title: string;
  dateDisplay: string;
  venue: string;
  track: string;
  summary: string;
  highlights: string[];
  resources: {
    label: string;
    href: string;
  }[];
}

export const siteConfig = {
  chapterName: "GDG on Campus RV College of Engineering",
  shortName: "GDG on Campus RVCE",
  tagline:
    "An open student-run developer studio at RV College of Engineering building together across Web, AI/ML, Cloud, and Android.",
  location: "RV College of Engineering, Mysuru Road, Bengaluru",
  academicCycle: "2026–27 Build Cycle",
  disclaimer:
    "GDG on Campus RV College of Engineering is an independent student developer community chapter. It is not an official Google product, and views or projects shared here do not represent Google LLC.",
  credits: {
    fonts: "Plus Jakarta Sans & JetBrains Mono via Google Fonts",
    icons: "Lucide Icons (ISC License)",
  },
  navLinks: [
    { index: "01", label: "Home", href: "/" },
    { index: "02", label: "Events", href: "/events" },
    { index: "03", label: "Team", href: "/team" },
  ] satisfies NavLinkItem[],
  communityLinks: [
    {
      id: "github",
      label: "GitHub",
      handle: "@gdg-on-campus-rvce",
      description: "Starter kits, workshop labs, and open-source campus tools.",
      href: "https://github.com/gdg-on-campus-rvce-demo",
      accentColor: "blue",
    },
    {
      id: "discord",
      label: "Discord",
      handle: "RVCE Dev Studio",
      description: "Track channels, peer code reviews, and study jam threads.",
      href: "https://discord.gg/gdg-rvce-demo",
      accentColor: "green",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "GDG on Campus RVCE",
      description: "Session announcements, engineering recaps, and speaker spotlights.",
      href: "https://www.linkedin.com/company/gdg-on-campus-rvce-demo",
      accentColor: "blue",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@gdgoc.rvce",
      description: "Behind-the-scenes snapshots from campus build nights and demos.",
      href: "https://www.instagram.com/gdgoc.rvce.demo",
      accentColor: "red",
    },
    {
      id: "youtube",
      label: "YouTube",
      handle: "GDG on Campus RVCE",
      description: "Recorded technical deep-dives, teardown talks, and lab walkthroughs.",
      href: "https://www.youtube.com/@gdgoc-rvce-demo",
      accentColor: "yellow",
    },
  ] satisfies CommunityLinkItem[],
  pillars: [
    {
      index: "01",
      title: "Web & Edge Systems",
      description:
        "Modern web standards, accessible interfaces, performance profiling, and resilient full-stack engineering.",
      accentColor: "blue",
      geometryVariant: "hex",
    },
    {
      index: "02",
      title: "Applied AI & Agents",
      description:
        "Hands-on model tooling, retrieval pipelines, evaluation harnesses, and responsible agent workflows.",
      accentColor: "green",
      geometryVariant: "diamond",
    },
    {
      index: "03",
      title: "Cloud & Infrastructure",
      description:
        "Linux foundations, Kubernetes orchestration, reproducible deployments, and production observability.",
      accentColor: "red",
      geometryVariant: "cube",
    },
    {
      index: "04",
      title: "Android & Design Craft",
      description:
        "Jetpack Compose, Flutter UI architecture, motion ergonomics, and cohesive developer design systems.",
      accentColor: "yellow",
      geometryVariant: "rings",
    },
  ] satisfies CommunityPillar[],
  latestRecap: {
    eventSlug: "devfest-campus-warmup",
    eyebrow: "Latest Session Recap",
    title: "DevFest Campus Warmup",
    dateDisplay: "24 Oct 2026",
    venue: "IEM Auditorium, RVCE",
    track: "Web",
    summary:
      "Our autumn kickoff paired live system architecture teardowns with rapid prototype clinics across frontend performance, local LLM tooling, and cloud deployments.",
    highlights: [
      "Three live code-along architecture teardowns covering edge routing, streaming UI, and container debugging.",
      "Open lightning-demo desk where student builders walked through real debugging postmortems and design decisions.",
      "Published reproducible starter repositories and annotated slide decks for anyone catching up asynchronously.",
    ],
    resources: [
      {
        label: "Session Starter Repo",
        href: "https://github.com/gdg-on-campus-rvce-demo/devfest-campus-warmup",
      },
      {
        label: "Read Full Event Notes",
        href: "/events/devfest-campus-warmup",
      },
    ],
  } satisfies LatestRecapContent,
} as const;

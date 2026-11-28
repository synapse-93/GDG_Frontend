export interface NavLinkItem {
  label: string;
  href: "/" | "/events" | "/team";
  accentDot: string;
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
  title: string;
  shortLabel: string;
  description: string;
  engineeringFocus: string;
  campusLab: string;
  stackTags: string[];
  trackFilter: "Web" | "AI / ML" | "Cloud" | "Android";
  accentColor: "blue" | "red" | "yellow" | "green";
}

export interface LatestRecapContent {
  eventSlug: string;
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
    "A student-run developer community at RV College of Engineering building together across Web, AI/ML, Cloud, and Android.",
  location: "RV College of Engineering, Bengaluru",
  academicCycle: "2026–27 Academic Year",
  disclaimer:
    "GDG on Campus RV College of Engineering is an independent student developer community chapter. It is not an official Google product, and views or projects shared here do not represent Google LLC.",
  credits: {
    fonts: "Plus Jakarta Sans & JetBrains Mono via Google Fonts",
    icons: "Lucide Icons (ISC License)",
  },
  navLinks: [
    { label: "Home", href: "/", accentDot: "bg-[#4285F4] dark:bg-[#669DF6]" },
    {
      label: "Events",
      href: "/events",
      accentDot: "bg-[#34A853] dark:bg-[#81C995]",
    },
    {
      label: "Team",
      href: "/team",
      accentDot: "bg-[#EA4335] dark:bg-[#F28B82]",
    },
  ] satisfies NavLinkItem[],
  communityLinks: [
    {
      id: "github",
      label: "GitHub",
      handle: "@gdg-on-campus-rvce",
      description: "Starter repos, workshop labs, and open-source student tools.",
      href: "https://github.com/gdg-on-campus-rvce-demo",
      accentColor: "blue",
    },
    {
      id: "discord",
      label: "Discord",
      handle: "RVCE Discord Server",
      description: "Track channels, peer code reviews, and study jam threads.",
      href: "https://discord.gg/gdg-rvce-demo",
      accentColor: "green",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "GDG on Campus RVCE",
      description:
        "Session announcements, event recaps, and speaker spotlights.",
      href: "https://www.linkedin.com/company/google-developer-groups-rvce/",
      accentColor: "blue",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@gdg_rvce",
      description:
        "Snapshots from campus build nights, workshops, and live demos.",
      href: "https://www.instagram.com/gdg_rvce/",
      accentColor: "red",
    },
    {
      id: "youtube",
      label: "YouTube",
      handle: "GDG on Campus RVCE",
      description:
        "Recorded talks, code walkthroughs, and workshop replays.",
      href: "https://www.youtube.com/@gdgoc-rvce-demo",
      accentColor: "yellow",
    },
  ] satisfies CommunityLinkItem[],
  pillars: [
    {
      title: "Web & Edge Systems",
      shortLabel: "Web",
      description:
        "Modern web standards, accessible UI, performance debugging, and full-stack apps.",
      engineeringFocus:
        "Core Web Vitals debugging, React Server Components, WCAG AA color systems, and fast UI.",
      campusLab: "EC Seminar Hall · Web Lab",
      stackTags: ["Next.js 16", "TypeScript", "Tailwind v4", "Web Vitals"],
      trackFilter: "Web",
      accentColor: "blue",
    },
    {
      title: "Applied AI & Agents",
      shortLabel: "AI / ML",
      description:
        "Hands-on model tooling, retrieval pipelines, test suites, and practical agent workflows.",
      engineeringFocus:
        "Schema-enforced tool calling, deterministic guardrails, local model quantization, and regression checks.",
      campusLab: "CS Seminar Hall · AI Lab",
      stackTags: ["Python", "Structured Tools", "Eval Suites", "Local LLM"],
      trackFilter: "AI / ML",
      accentColor: "green",
    },
    {
      title: "Cloud & Infrastructure",
      shortLabel: "Cloud",
      description:
        "Linux fundamentals, Kubernetes deployments, clean container setups, and service tracing.",
      engineeringFocus:
        "Kernel namespaces & cgroups v2 from scratch, GKE Autopilot manifests, readiness probes, and tracing.",
      campusLab: "IEM Auditorium · Systems Lab",
      stackTags: ["Linux Kernel", "Go / Rust", "Kubernetes", "Google Cloud"],
      trackFilter: "Cloud",
      accentColor: "red",
    },
    {
      title: "Android & Design Craft",
      shortLabel: "Android",
      description:
        "Jetpack Compose, Flutter UI, adaptive screen layouts, and clean student design systems.",
      engineeringFocus:
        "State hoisting, phone-to-tablet layouts, touch targets, and smooth 60fps animations.",
      campusLab: "EC Seminar Hall · Mobile Lab",
      stackTags: ["Jetpack Compose", "Kotlin", "Flutter", "Design Tokens"],
      trackFilter: "Android",
      accentColor: "yellow",
    },
  ] satisfies CommunityPillar[],
  latestRecap: {
    eventSlug: "devfest-campus-warmup",
    title: "DevFest Campus Warmup",
    dateDisplay: "24 Oct 2026",
    venue: "IEM Auditorium, RVCE",
    track: "Web",
    summary:
      "Our autumn kickoff paired live code walkthroughs with hands-on debugging clinics across web performance, local LLMs, and cloud deployments.",
    highlights: [
      "Three live code-along walkthroughs covering edge routing, streaming UI, and container debugging.",
      "Open lightning-demo desk where students shared real bugs they fixed and what they learned.",
      "Published starter repos and annotated slides so anyone who missed the session can catch up.",
    ],
    resources: [
      {
        label: "Read Full Event Notes",
        href: "/events/devfest-campus-warmup",
      },
      {
        label: "Session Starter Repo",
        href: "https://github.com/gdg-on-campus-rvce-demo/devfest-campus-warmup",
      },
    ],
  } satisfies LatestRecapContent,
} as const;

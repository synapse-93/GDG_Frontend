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

export interface RecapHighlightTile {
  id: string;
  label: string;
  scene: "teardown" | "flamegraph" | "postmortem" | "starterkit";
  headline: string;
  detail: string;
  artifact: string;
  accentColor: "blue" | "green" | "red" | "yellow";
}

export interface LatestRecapContent {
  eventSlug: string;
  title: string;
  dateDisplay: string;
  venue: string;
  track: string;
  summary: string;
  highlights: string[];
  takeawayTabs: RecapHighlightTile[];
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
      description:
        "Session announcements, engineering recaps, and speaker spotlights.",
      href: "https://www.linkedin.com/company/google-developer-groups-rvce/",
      accentColor: "blue",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@gdg_rvce",
      description:
        "Behind-the-scenes snapshots from campus build nights and demos.",
      href: "https://www.instagram.com/gdg_rvce/",
      accentColor: "red",
    },
    {
      id: "youtube",
      label: "YouTube",
      handle: "GDG on Campus RVCE",
      description:
        "Recorded technical deep-dives, teardown talks, and lab walkthroughs.",
      href: "https://www.youtube.com/@gdgoc-rvce-demo",
      accentColor: "yellow",
    },
  ] satisfies CommunityLinkItem[],
  pillars: [
    {
      title: "Web & Edge Systems",
      shortLabel: "Web",
      description:
        "Modern web standards, accessible interfaces, performance audits, and resilient full-stack engineering.",
      engineeringFocus:
        "Core Web Vitals audits, streaming Server Components, WCAG AA color systems, and crisp interactive UI.",
      campusLab: "EC Seminar Hall · Web Systems Lab",
      stackTags: ["Next.js 16", "TypeScript", "Tailwind v4", "Web Vitals"],
      trackFilter: "Web",
      accentColor: "blue",
    },
    {
      title: "Applied AI & Agents",
      shortLabel: "AI / ML",
      description:
        "Hands-on model tooling, retrieval pipelines, evaluation suites, and responsible agent workflows.",
      engineeringFocus:
        "Schema-enforced tool calling, deterministic guardrails, local model quantization, and regression checks.",
      campusLab: "CS Seminar Hall · AI Agents Lab",
      stackTags: ["Python", "Structured Tools", "Eval Suites", "Local LLM"],
      trackFilter: "AI / ML",
      accentColor: "green",
    },
    {
      title: "Cloud & Infrastructure",
      shortLabel: "Cloud",
      description:
        "Linux foundations, Kubernetes orchestration, reproducible deployments, and service observability.",
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
        "Jetpack Compose, Flutter UI architecture, adaptive layouts, and cohesive student design systems.",
      engineeringFocus:
        "Unidirectional state hoisting, adaptive phone-to-tablet layouts, touch ergonomics, and smooth UI motion.",
      campusLab: "EC Seminar Hall · Mobile UI Lab",
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
      "Our autumn kickoff paired live system architecture teardowns with rapid prototype clinics across web performance, local LLM tooling, and cloud deployments.",
    highlights: [
      "Three live code-along architecture teardowns covering edge routing, streaming UI, and container debugging.",
      "Open lightning-demo desk where student builders walked through real debugging postmortems and design decisions.",
      "Published reproducible starter repositories and annotated slide decks for anyone catching up asynchronously.",
    ],
    takeawayTabs: [
      {
        id: "teardowns",
        label: "Teardown",
        scene: "teardown",
        headline: "Edge routing, streaming UI, and container debugging live on stage",
        detail:
          "Three RVCE track leads opened real student repositories in DevTools and terminals—walking through cold-start latency, partial prerendering boundaries, and crash-looping container probes.",
        artifact: "starter-kit/edge-teardown-checklist.md",
        accentColor: "blue",
      },
      {
        id: "flamegraphs",
        label: "Perf Clinic",
        scene: "flamegraph",
        headline: "Trimming hydration cost and layout shifts in student web apps",
        detail:
          "Builders audited main-thread bottlenecks side by side in Chrome DevTools, splitting heavy client trees into Server Components and preloaded variable fonts.",
        artifact: "starter-kit/web-perf-notes.md",
        accentColor: "green",
      },
      {
        id: "postmortems",
        label: "Postmortems",
        scene: "postmortem",
        headline: "Honest debugging stories from shipped campus prototypes",
        detail:
          "Student builders shared what actually broke during demo week: hydration mismatches on live clocks, runaway tool loops in agent prototypes, and WCAG contrast traps on yellow surfaces.",
        artifact: "notes/autumn-postmortem-log.md",
        accentColor: "red",
      },
      {
        id: "handoff",
        label: "Starter Kits",
        scene: "starterkit",
        headline: "Reproducible repositories & accessibility checklists for self-paced study",
        detail:
          "Every demo shipped with a locked dependency manifest, local setup script, and keyboard-accessibility audit list so students from any branch can reproduce the workshops asynchronously.",
        artifact: "github.com/gdg-on-campus-rvce-demo/devfest-campus-warmup",
        accentColor: "yellow",
      },
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

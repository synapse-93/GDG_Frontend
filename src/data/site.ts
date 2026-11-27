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
  cliSnippet: string;
  trackFilter: "Web" | "AI / ML" | "Cloud" | "Android";
  accentColor: "blue" | "red" | "yellow" | "green";
  geometryVariant: "cube" | "rings" | "diamond" | "hex";
}

export interface RecapTakeawayTab {
  id: string;
  label: string;
  headline: string;
  detail: string;
  artifact: string;
}

export interface LatestRecapContent {
  eventSlug: string;
  title: string;
  dateDisplay: string;
  venue: string;
  track: string;
  summary: string;
  highlights: string[];
  takeawayTabs: RecapTakeawayTab[];
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
        "Modern web standards, accessible interfaces, performance profiling, and resilient full-stack engineering.",
      engineeringFocus:
        "Flamegraph profiling, streaming Server Components, WCAG AA color systems, and zero-jank GPU-composited motion.",
      campusLab: "EC Seminar Hall · Perf & Edge Lab",
      stackTags: ["Next.js 16", "TypeScript", "Tailwind v4", "Web Vitals"],
      cliSnippet: `$ npx lighthouse http://localhost:3000 --preset=desktop\n  LCP 0.8s · INP 24ms · CLS 0.00 · A11y 100\n$ curl -sI https://edge.rvce.dev | grep cache-status\n  cache-status: HIT; ttl=3600`,
      trackFilter: "Web",
      accentColor: "blue",
      geometryVariant: "hex",
    },
    {
      title: "Applied AI & Agents",
      shortLabel: "AI / ML",
      description:
        "Hands-on model tooling, retrieval pipelines, evaluation harnesses, and responsible agent workflows.",
      engineeringFocus:
        "Schema-enforced tool calling, deterministic guardrails, local model quantization, and golden-set regression evals.",
      campusLab: "CS Seminar Hall · Agent Eval Studio",
      stackTags: ["Python", "Structured Tools", "Eval Harnesses", "Local LLM"],
      cliSnippet: `$ uv run eval-harness --suite golden-campus.json\n  [pass] tool_schema_strict  (24/24)\n  [pass] retry_budget_bound  (24/24)\n  median_latency=412ms · regressions=0`,
      trackFilter: "AI / ML",
      accentColor: "green",
      geometryVariant: "diamond",
    },
    {
      title: "Cloud & Infrastructure",
      shortLabel: "Cloud",
      description:
        "Linux foundations, Kubernetes orchestration, reproducible deployments, and production observability.",
      engineeringFocus:
        "Kernel namespaces & cgroups v2 from scratch, GKE Autopilot manifests, readiness probes, and OpenTelemetry traces.",
      campusLab: "IEM Auditorium · Systems Clinic",
      stackTags: ["Linux Kernel", "Go / Rust", "Kubernetes", "Google Cloud"],
      cliSnippet: `$ unshare --pid --mount --uts --fork /bin/sh\n$ echo "+cpu +memory" > /sys/fs/cgroup/rvce-box/cgroup.subtree_control\n$ kubectl rollout status deploy/campus-api\n  deployment "campus-api" successfully rolled out`,
      trackFilter: "Cloud",
      accentColor: "red",
      geometryVariant: "cube",
    },
    {
      title: "Android & Design Craft",
      shortLabel: "Android",
      description:
        "Jetpack Compose, Flutter UI architecture, motion ergonomics, and cohesive developer design systems.",
      engineeringFocus:
        "Unidirectional state hoisting, adaptive phone-to-tablet layouts, semantic touch ergonomics, and 60fps choreography.",
      campusLab: "EC Seminar Hall · Declarative UI Studio",
      stackTags: ["Jetpack Compose", "Kotlin", "Flutter", "Design Tokens"],
      cliSnippet: `$ ./gradlew :app:connectedCheck --info\n  AdaptiveRailTest > compactToExpanded PASSED\n  ContrastAuditTest > darkInkOnYellow  PASSED\n$ flutter run --profile --trace-skia`,
      trackFilter: "Android",
      accentColor: "yellow",
      geometryVariant: "rings",
    },
  ] satisfies CommunityPillar[],
  latestRecap: {
    eventSlug: "devfest-campus-warmup",
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
    takeawayTabs: [
      {
        id: "teardowns",
        label: "Architecture Teardowns",
        headline: "Edge routing, streaming UI, and container debugging live on stage",
        detail:
          "Three RVCE track leads opened real student repositories in DevTools and POSIX terminals—walking through cold-start latency, partial prerendering boundaries, and crash-looping container probes without slideware.",
        artifact: "starter-kit/edge-teardown-checklist.md",
      },
      {
        id: "postmortems",
        label: "Lightning Postmortems",
        headline: "Honest debugging stories from shipped campus prototypes",
        detail:
          "Student builders shared what actually broke during demo week: hydration mismatches on live clocks, runaway token loops in agent prototypes, and WCAG contrast traps on yellow surfaces.",
        artifact: "notes/autumn-postmortem-log.md",
      },
      {
        id: "handoff",
        label: "Open Starter Kits",
        headline: "Reproducible repositories & accessibility checklists for self-paced study",
        detail:
          "Every demo shipped with a locked dependency manifest, local setup script, and keyboard-accessibility audit list so students from any branch can reproduce the workshops asynchronously.",
        artifact: "github.com/gdg-on-campus-rvce-demo/devfest-campus-warmup",
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

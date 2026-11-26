export type EventTrack = "Web" | "AI / ML" | "Cloud" | "Android";
export type EventStatus = "upcoming" | "past";

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
}

export interface EventItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  track: EventTrack;
  status: EventStatus;
  dateISO: string;
  dateDisplay: string;
  timeDisplay: string;
  mode: "In-Person" | "Online" | "Hybrid";
  venue: string;
  registrationUrl: string;
  prerequisites: string[];
  outcomes: string[];
  agenda: AgendaItem[];
  geometryVariant: "cube" | "rings" | "diamond" | "hex";
  imagePath?: string;
}

export const EVENT_TRACKS: readonly EventTrack[] = [
  "Web",
  "AI / ML",
  "Cloud",
  "Android",
] as const;

export const events: EventItem[] = [
  {
    slug: "linux-and-systems-night",
    title: "Linux & Systems Night",
    tagline:
      "Build a minimal container runtime from scratch using Linux namespaces, cgroups v2, and overlay filesystems.",
    description:
      "An evening systems engineering clinic at IEM Auditorium exploring what actually happens beneath Docker and Kubernetes. We inspect kernel primitives live in the terminal, trace syscalls with strace and eBPF, and assemble a working process sandbox step by step.",
    track: "Cloud",
    status: "upcoming",
    dateISO: "2026-12-12T17:30:00+05:30",
    dateDisplay: "12 Dec 2026",
    timeDisplay: "05:30 PM – 08:30 PM IST",
    mode: "In-Person",
    venue: "IEM Auditorium, RVCE",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-linux-systems-night/",
    prerequisites: [
      "Laptop running Linux, macOS, or Windows with WSL2 enabled",
      "Comfort navigating the POSIX shell and basic process concepts",
      "Go 1.22+ or Rust toolchain installed locally for the hands-on lab",
    ],
    outcomes: [
      "Understand how PID, mount, and network namespaces isolate Linux workloads",
      "Configure cgroups v2 memory and CPU budgets directly via sysfs",
      "Profile live process bottlenecks using lightweight kernel tracing tools",
    ],
    agenda: [
      {
        time: "05:30 PM",
        title: "Check-in & Kernel Environment Setup",
        speaker: "Kiran Deshpande",
      },
      {
        time: "06:00 PM",
        title: "Demystifying Namespaces, chroot & OverlayFS",
        speaker: "Niharika Kulkarni",
      },
      {
        time: "07:00 PM",
        title: "Hands-On Lab: Building a 120-Line Container Runner",
        speaker: "Rohan Subramanian",
      },
      {
        time: "08:00 PM",
        title: "Live Debugging Clinic & Wrap-Up",
        speaker: "Kiran Deshpande",
      },
    ],
    geometryVariant: "cube",
  },
  {
    slug: "autonomous-ai-agents-workshop",
    title: "Autonomous AI Agents Workshop",
    tagline:
      "Design reliable tool-calling agent loops, deterministic guardrails, and structured evaluation suites.",
    description:
      "Move past single-prompt demos into inspectable agentic architectures. This workshop covers schema-enforced tool invocation, context budgeting, failure recovery loops, and automated trace evaluation so student builders can ship dependable AI workflows.",
    track: "AI / ML",
    status: "upcoming",
    dateISO: "2027-01-16T10:00:00+05:30",
    dateDisplay: "16 Jan 2027",
    timeDisplay: "10:00 AM – 01:30 PM IST",
    mode: "Hybrid",
    venue: "CS Seminar Hall, RVCE",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-autonomous-ai-agents/",
    prerequisites: [
      "Python 3.11+ or Node.js 20+ installed with a code editor",
      "Familiarity with REST APIs and JSON Schema basics",
      "Curiosity about prompt debugging and evaluation metrics",
    ],
    outcomes: [
      "Implement a multi-step agent loop with typed function calling and retry limits",
      "Build a lightweight golden-dataset evaluator to catch prompt regressions",
      "Apply latency, token-budget, and input-validation guardrails before deployment",
    ],
    agenda: [
      {
        time: "10:00 AM",
        title: "Anatomy of Reliable Tool-Using Agents",
        speaker: "Meera Balasubramanian",
      },
      {
        time: "10:50 AM",
        title: "Workshop Part 1: Structured Tool Contracts & Memory State",
        speaker: "Devansh Iyer",
      },
      {
        time: "12:00 PM",
        title: "Workshop Part 2: Automated Eval Harnesses & Failure Injection",
        speaker: "Meera Balasubramanian",
      },
      {
        time: "01:00 PM",
        title: "Architecture Q&A & Starter Repo Walkthrough",
        speaker: "Devansh Iyer",
      },
    ],
    geometryVariant: "diamond",
  },
  {
    slug: "web-performance-and-edge-architecture",
    title: "Web Performance & Edge Architecture",
    tagline:
      "Audit real rendering bottlenecks, master streaming Server Components, and eliminate layout shift at the edge.",
    description:
      "A deep technical session on modern web ergonomics and performance engineering. We dissect flamegraphs in Chrome DevTools, compare static pre-rendering with edge streaming, and optimize typography, hydration payloads, and GPU-composited animations.",
    track: "Web",
    status: "upcoming",
    dateISO: "2027-02-06T10:30:00+05:30",
    dateDisplay: "06 Feb 2027",
    timeDisplay: "10:30 AM – 01:30 PM IST",
    mode: "In-Person",
    venue: "EC Seminar Hall, RVCE",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-web-perf-edge/",
    prerequisites: [
      "Working knowledge of HTML, CSS, and React or TypeScript",
      "Chrome or Chromium browser for DevTools Performance panel labs",
      "Node.js 20+ ready to clone and profile the benchmark repository",
    ],
    outcomes: [
      "Diagnose LCP, INP, and CLS regressions using DevTools traces and Lighthouse",
      "Structure Server and Client Component boundaries to trim client JS bundles",
      "Design zero-jank UI transitions using GPU-composited transform and opacity rules",
    ],
    agenda: [
      {
        time: "10:30 AM",
        title: "Reading Browser Flamegraphs Without Guesswork",
        speaker: "Ananya Venkataraman",
      },
      {
        time: "11:20 AM",
        title: "Streaming HTML, Partial Prerendering & Edge Caching",
        speaker: "Siddharth Menon",
      },
      {
        time: "12:15 PM",
        title: "Live Audit Lab: Cutting Hydration Cost by 60%",
        speaker: "Ananya Venkataraman",
      },
      {
        time: "01:05 PM",
        title: "Open Checklist Review & Take-Home Benchmarks",
        speaker: "Siddharth Menon",
      },
    ],
    geometryVariant: "hex",
  },
  {
    slug: "devfest-campus-warmup",
    title: "DevFest Campus Warmup",
    tagline:
      "Lightning architecture teardowns, live debugging sprints, and multi-track project clinics ahead of DevFest season.",
    description:
      "Our flagship autumn build gathering brought campus engineers together across Web, AI, and Cloud tracks for rapid design reviews, live bug-hunt sessions, and practical lessons from shipping student open-source projects.",
    track: "Web",
    status: "past",
    dateISO: "2026-10-24T09:30:00+05:30",
    dateDisplay: "24 Oct 2026",
    timeDisplay: "09:30 AM – 01:00 PM IST",
    mode: "In-Person",
    venue: "IEM Auditorium, RVCE",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-devfest-warmup/",
    prerequisites: [
      "Open to students across all branches and experience levels",
      "Optional laptop for the collaborative prototype clinic",
    ],
    outcomes: [
      "Reviewed real-world frontend and backend postmortems from student projects",
      "Published reusable accessibility and deployment checklists for campus teams",
      "Formed multi-vertical peer study circles for the winter build cycle",
    ],
    agenda: [
      {
        time: "09:30 AM",
        title: "Opening Note: Building Open Developer Culture on Campus",
        speaker: "Aarav Krishnamurthy",
      },
      {
        time: "10:15 AM",
        title: "Architecture Teardown: From Prototype to Resilient Deployment",
        speaker: "Ananya Venkataraman",
      },
      {
        time: "11:15 AM",
        title: "Lightning Demos: Debugging Stories & Design Craft",
        speaker: "Tara Narayanan",
      },
      {
        time: "12:15 PM",
        title: "Track Clinic Breakouts & Resource Handover",
        speaker: "Aarav Krishnamurthy",
      },
    ],
    geometryVariant: "rings",
  },
  {
    slug: "flutter-and-compose-ui-lab",
    title: "Flutter & Compose UI Lab",
    tagline:
      "Side-by-side declarative mobile engineering: adaptive layouts, state hoisting, and 60fps micro-interactions.",
    description:
      "A practical mobile studio comparing Jetpack Compose and Flutter idioms through a single shared interface specification. Builders implemented adaptive tablet-to-phone layouts, theme tokens, and accessible touch ergonomics in real time.",
    track: "Android",
    status: "past",
    dateISO: "2026-09-19T14:00:00+05:30",
    dateDisplay: "19 Sep 2026",
    timeDisplay: "02:00 PM – 05:30 PM IST",
    mode: "Hybrid",
    venue: "EC Seminar Hall, RVCE",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-flutter-compose-lab/",
    prerequisites: [
      "Android Studio or VS Code with Flutter SDK configured",
      "Basic understanding of Kotlin or Dart syntax",
    ],
    outcomes: [
      "Built responsive single-codebase layouts adapting cleanly to compact and expanded screens",
      "Applied unidirectional state flow to eliminate unnecessary UI recompositions",
      "Audited mobile tap targets, semantic labels, and contrast across Light and Dark themes",
    ],
    agenda: [
      {
        time: "02:00 PM",
        title: "Declarative Mental Models: Compose vs. Flutter Widget Trees",
        speaker: "Pranav Hegde",
      },
      {
        time: "02:50 PM",
        title: "Hands-On Lab: Adaptive Navigation & State Hoisting",
        speaker: "Tara Narayanan",
      },
      {
        time: "04:10 PM",
        title: "Motion Choreography & Frame-Budget Profiling",
        speaker: "Pranav Hegde",
      },
      {
        time: "05:00 PM",
        title: "Code Review Showcase & Closing Notes",
        speaker: "Tara Narayanan",
      },
    ],
    geometryVariant: "cube",
  },
  {
    slug: "cloud-study-jam-kubernetes-on-gcp",
    title: "Cloud Study Jam: Kubernetes on GCP",
    tagline:
      "Declarative deployments, GKE Autopilot fundamentals, health probes, and zero-downtime rollouts.",
    description:
      "An interactive online study jam walking through container packaging, Kubernetes primitives, ConfigMaps, readiness probes, and rolling updates on Google Kubernetes Engine. Every concept was paired with a reproducible YAML blueprint.",
    track: "Cloud",
    status: "past",
    dateISO: "2026-08-22T18:00:00+05:30",
    dateDisplay: "22 Aug 2026",
    timeDisplay: "06:00 PM – 08:30 PM IST",
    mode: "Online",
    venue: "Google Meet",
    registrationUrl:
      "https://gdg.community.dev/events/details/rvce-demo-cloud-study-jam-k8s/",
    prerequisites: [
      "Basic familiarity with Dockerfiles and HTTP services",
      "Modern web browser for Google Cloud Shell lab access",
    ],
    outcomes: [
      "Authored declarative Deployment, Service, and Ingress manifests from scratch",
      "Configured liveness and readiness probes for zero-downtime rolling updates",
      "Inspected pod logs, events, and autoscaling behavior via kubectl",
    ],
    agenda: [
      {
        time: "06:00 PM",
        title: "Kubernetes Control Plane & Pod Lifecycle Primer",
        speaker: "Rohan Subramanian",
      },
      {
        time: "06:45 PM",
        title: "Guided Lab: Deploying Multi-Service Apps on GKE Autopilot",
        speaker: "Niharika Kulkarni",
      },
      {
        time: "07:45 PM",
        title: "Resilience Drill: Health Probes, Rollbacks & Resource Quotas",
        speaker: "Rohan Subramanian",
      },
      {
        time: "08:15 PM",
        title: "Study Path Resources & Q&A",
        speaker: "Niharika Kulkarni",
      },
    ],
    geometryVariant: "hex",
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}

export function getUpcomingEvents(): EventItem[] {
  return events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());
}

export function getPastEvents(): EventItem[] {
  return events
    .filter((event) => event.status === "past")
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
}

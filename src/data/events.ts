export type EventTrack = "Web" | "AI / ML" | "Cloud" | "Android";
export type EventStatus = "upcoming" | "past";

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
  memberSlug: string;
  notes: string;
  setupTip: string;
}

export interface EventItem {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  track: EventTrack;
  status: EventStatus;
  dateISO: string;
  endISO: string;
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
    endISO: "2026-12-12T20:30:00+05:30",
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
        speaker: "Aarav Krishnamurthy",
        memberSlug: "aarav-krishnamurthy",
        notes:
          "Verify cgroups v2 mount points, kernel headers, and isolated lab directories so everyone compiles cleanly before the live walkthrough starts.",
        setupTip: "Run `stat -fc %T /sys/fs/cgroup/` and confirm it outputs `cgroup2fs`.",
      },
      {
        time: "06:00 PM",
        title: "Demystifying Namespaces, chroot & OverlayFS",
        speaker: "Niharika Kulkarni",
        memberSlug: "niharika-kulkarni",
        notes:
          "Live terminal demonstration peeling back a container image into lower/upper overlay layers and isolating hostname, PID tree, and filesystem root.",
        setupTip: "Have `util-linux` (`unshare`, `nsenter`) and `strace` available in PATH.",
      },
      {
        time: "07:00 PM",
        title: "Hands-On Lab: Building a 120-Line Container Runner",
        speaker: "Rohan Subramanian",
        memberSlug: "rohan-subramanian",
        notes:
          "Step-by-step coding sprint writing a minimal Go/Rust process runner that forks with `CLONE_NEWPID | CLONE_NEWNS`, pivots root, and enforces a 64MB cgroup ceiling.",
        setupTip: "Clone the starter skeleton early: `git clone https://github.com/gdg-on-campus-rvce-demo/tiny-runtime`.",
      },
      {
        time: "08:00 PM",
        title: "Live Debugging Clinic & Wrap-Up",
        speaker: "Aarav Krishnamurthy",
        memberSlug: "aarav-krishnamurthy",
        notes:
          "Open troubleshooting table for kernel permission edge cases, rootless user namespaces, and next-step systems reading references.",
        setupTip: "Bring any failing `strace` logs or Dockerfile layering questions for live review.",
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
    endISO: "2027-01-16T13:30:00+05:30",
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
        memberSlug: "meera-balasubramanian",
        notes:
          "Compare brittle unconstrained loops against bounded state machines with explicit stop conditions, schema validation, and human-in-the-loop checkpoints.",
        setupTip: "Ensure `python3 --version` (>= 3.11) or `node -v` (>= 20) runs cleanly.",
      },
      {
        time: "10:50 AM",
        title: "Workshop Part 1: Structured Tool Contracts & Memory State",
        speaker: "Devansh Iyer",
        memberSlug: "devansh-iyer",
        notes:
          "Author typed JSON schemas for tool invocations, wire deterministic mock tools for offline testing, and cap rolling context windows without losing state.",
        setupTip: "Pre-install `uv` or `npm` so starter packages resolve fast on campus Wi-Fi.",
      },
      {
        time: "12:00 PM",
        title: "Workshop Part 2: Automated Eval Harnesses & Failure Injection",
        speaker: "Meera Balasubramanian",
        memberSlug: "meera-balasubramanian",
        notes:
          "Build a 20-case golden evaluation suite that injects malformed tool outputs and timeouts to verify graceful recovery before shipping.",
        setupTip: "Use the provided local mock replay fixture—no paid API key required for the lab.",
      },
      {
        time: "01:00 PM",
        title: "Architecture Q&A & Starter Repo Walkthrough",
        speaker: "Devansh Iyer",
        memberSlug: "devansh-iyer",
        notes:
          "Open clinic reviewing student project ideas, trace logging formats, and cost/latency budgeting for capstone deployments.",
        setupTip: "Bookmark the trace-inspector template from the starter repository.",
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
    endISO: "2027-02-06T13:30:00+05:30",
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
        memberSlug: "ananya-venkataraman",
        notes:
          "Pinpoint main-thread long tasks, layout thrashing, and hydration waterfalls on real student web apps using Chrome Performance Insights.",
        setupTip: "Open an incognito Chrome window with extensions disabled for clean traces.",
      },
      {
        time: "11:20 AM",
        title: "Streaming HTML, Partial Prerendering & Edge Caching",
        speaker: "Siddharth Menon",
        memberSlug: "siddharth-menon",
        notes:
          "Trace how static shells stream alongside `<Suspense>` boundaries so navigation feels instant while dynamic segments resolve cleanly.",
        setupTip: "Have `node -v` (>= 20) and `npm run build` ready on the benchmark repo.",
      },
      {
        time: "12:15 PM",
        title: "Live Audit Lab: Cutting Hydration Cost by 60%",
        speaker: "Ananya Venkataraman",
        memberSlug: "ananya-venkataraman",
        notes:
          "Refactor an intentionally bloated client bundle into crisp Server Components, async LazyMotion springs, and preloaded variable fonts.",
        setupTip: "Compare `next build` route sizes before and after moving static blocks server-side.",
      },
      {
        time: "01:05 PM",
        title: "Open Checklist Review & Take-Home Benchmarks",
        speaker: "Siddharth Menon",
        memberSlug: "siddharth-menon",
        notes:
          "Walk through the chapter's shipping checklist for INP, reduced-motion, and WCAG AA contrast across Light and Dark themes.",
        setupTip: "Export your before/after Lighthouse JSON report for reference.",
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
    endISO: "2026-10-24T13:00:00+05:30",
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
        memberSlug: "aarav-krishnamurthy",
        notes:
          "Framed the 2026–27 chapter build cycle around reproducible workshops, public starter kits, and peer engineering critiques.",
        setupTip: "Slides and semester roadmap are archived in the starter repository.",
      },
      {
        time: "10:15 AM",
        title: "Architecture Teardown: From Prototype to Resilient Deployment",
        speaker: "Ananya Venkataraman",
        memberSlug: "ananya-venkataraman",
        notes:
          "Live refactoring session transforming a fragile hackathon app into an accessible, statically prerendered Next.js build.",
        setupTip: "Review the `teardown-diff` branch in the DevFest Warmup repo.",
      },
      {
        time: "11:15 AM",
        title: "Lightning Demos: Debugging Stories & Design Craft",
        speaker: "Tara Narayanan",
        memberSlug: "tara-narayanan",
        notes:
          "Fast-paced demos covering contrast audits, typographic hierarchy on mobile viewports, and GPU-composited motion craft.",
        setupTip: "Download the WCAG AA palette token reference from the recap notes.",
      },
      {
        time: "12:15 PM",
        title: "Track Clinic Breakouts & Resource Handover",
        speaker: "Aarav Krishnamurthy",
        memberSlug: "aarav-krishnamurthy",
        notes:
          "Small-group Q&A tables across Web, AI/ML, Cloud, and Android tracks for students selecting winter study jams.",
        setupTip: "Browse upcoming tracks on `/events` to catch the winter labs.",
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
    endISO: "2026-09-19T17:30:00+05:30",
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
        memberSlug: "pranav-hegde",
        notes:
          "Side-by-side comparison of Compose slot APIs, recomposition scopes, and Flutter's Element/RenderObject pipeline.",
        setupTip: "Run `flutter doctor` or sync Gradle dependencies before running the sample project.",
      },
      {
        time: "02:50 PM",
        title: "Hands-On Lab: Adaptive Navigation & State Hoisting",
        speaker: "Tara Narayanan",
        memberSlug: "tara-narayanan",
        notes:
          "Implemented canonical compact-to-expanded layout switches using shared design tokens and `48dp` minimum touch targets.",
        setupTip: "Test both `375px` phone and `768px` tablet emulators from the starter workspace.",
      },
      {
        time: "04:10 PM",
        title: "Motion Choreography & Frame-Budget Profiling",
        speaker: "Pranav Hegde",
        memberSlug: "pranav-hegde",
        notes:
          "Profiled jank frames in Android GPU Inspector and Flutter DevTools to keep gesture transitions locked at 60fps.",
        setupTip: "Always profile in `--profile` mode rather than debug builds.",
      },
      {
        time: "05:00 PM",
        title: "Code Review Showcase & Closing Notes",
        speaker: "Tara Narayanan",
        memberSlug: "tara-narayanan",
        notes:
          "Walked through student-submitted UI implementations and shared accessibility checklists for TalkBack and screen magnification.",
        setupTip: "Enable Layout Bounds in Developer Options to verify padding symmetry.",
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
    endISO: "2026-08-22T20:30:00+05:30",
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
        memberSlug: "rohan-subramanian",
        notes:
          "Explained reconciliation loops, kube-scheduler placement decisions, and why declarative state beats imperative cluster commands.",
        setupTip: "Launch Google Cloud Shell in browser for pre-authenticated `kubectl`.",
      },
      {
        time: "06:45 PM",
        title: "Guided Lab: Deploying Multi-Service Apps on GKE Autopilot",
        speaker: "Niharika Kulkarni",
        memberSlug: "niharika-kulkarni",
        notes:
          "Applied Deployment, ClusterIP Service, and ConfigMap blueprints to ship a two-tier demo API on GKE Autopilot.",
        setupTip: "Validate manifests locally with `kubectl apply --dry-run=client -f k8s/`.",
      },
      {
        time: "07:45 PM",
        title: "Resilience Drill: Health Probes, Rollbacks & Resource Quotas",
        speaker: "Rohan Subramanian",
        memberSlug: "rohan-subramanian",
        notes:
          "Triggered an intentional failing release, watched readiness probes halt bad traffic, and executed an instant `kubectl rollout undo`.",
        setupTip: "Inspect probe failure reasons via `kubectl describe pod <name>`.",
      },
      {
        time: "08:15 PM",
        title: "Study Path Resources & Q&A",
        speaker: "Niharika Kulkarni",
        memberSlug: "niharika-kulkarni",
        notes:
          "Shared self-paced Google Cloud skill badges, YAML linting hooks, and local `kind` cluster recipes for laptop practice.",
        setupTip: "Install `kind` locally to replay the manifests offline without cloud spend.",
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

export function getEventsBySpeaker(speakerName: string): EventItem[] {
  return events.filter((event) =>
    event.agenda.some(
      (slot) => slot.speaker.toLowerCase() === speakerName.toLowerCase()
    )
  );
}

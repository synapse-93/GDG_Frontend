export type TeamVertical =
  | "Lead & Core"
  | "Dev Vertical"
  | "AI / ML"
  | "Cloud"
  | "Design";

export type PortraitMask =
  | "hexagon"
  | "arch"
  | "clover"
  | "scallop"
  | "squircle"
  | "circle";

export type PortraitMotif =
  | "orbit"
  | "grid"
  | "prism"
  | "stack"
  | "nodes"
  | "wave"
  | "terminal"
  | "mesh"
  | "compass"
  | "kinetic";

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  vertical: TeamVertical;
  accentColor: "blue" | "red" | "yellow" | "green";
  bio: string;
  askMeAbout: string;
  techStack: string[];
  campusFocus: string;
  portraitMask: PortraitMask;
  portraitMotif: PortraitMotif;
  imagePath?: string;
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export const TEAM_VERTICALS: readonly TeamVertical[] = [
  "Lead & Core",
  "Dev Vertical",
  "AI / ML",
  "Cloud",
  "Design",
] as const;

export const teamMembers: TeamMember[] = [
  {
    id: "karthik-gowda",
    slug: "karthik-gowda",
    name: "Karthik Gowda",
    role: "GDG on Campus Organizer",
    vertical: "Lead & Core",
    accentColor: "blue",
    bio: "Runs the semester calendar, plans track workshops, and helps students turn weekend side projects into open-source repos.",
    askMeAbout: "Linux systems & campus sprints",
    techStack: ["TypeScript", "Go", "Linux", "Systems Architecture"],
    campusFocus:
      "Planning the 2026–27 workshop calendar, peer mentoring groups, and starter kits across all RVCE branches.",
    portraitMask: "hexagon",
    portraitMotif: "orbit",
    links: {
      github: "https://github.com/gdg-rvce-demo-karthik",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-karthik",
      website: "https://karthik-demo.example.dev",
    },
  },
  {
    id: "pranav-reddy",
    slug: "pranav-reddy",
    name: "Pranav Reddy",
    role: "Technical Operations Lead",
    vertical: "Lead & Core",
    accentColor: "blue",
    bio: "Sets up workshop labs, speaker checklists, and beginner guides so first-year students can jump right in.",
    askMeAbout: "Workshop runbooks & GitHub Actions",
    techStack: ["Python", "GitHub Actions", "Docs-as-Code", "DevEx"],
    campusFocus:
      "Keeping lab setups smooth and writing step-by-step guides so students from non-CS branches can ship on day one.",
    portraitMask: "arch",
    portraitMotif: "grid",
    links: {
      github: "https://github.com/gdg-rvce-demo-pranav",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-pranav",
    },
  },
  {
    id: "sneha-joshi",
    slug: "sneha-joshi",
    name: "Sneha Joshi",
    role: "Web Architecture Lead",
    vertical: "Dev Vertical",
    accentColor: "blue",
    bio: "Builds fast React apps, fixes tricky CSS layouts, and spends way too much time in Chrome DevTools chasing layout shifts.",
    askMeAbout: "Next.js perf profiling & a11y",
    techStack: ["Next.js", "React 19", "TypeScript", "Web Performance"],
    campusFocus:
      "Running Web Vitals clinics and maintaining open-source frontend starter templates for campus projects.",
    portraitMask: "squircle",
    portraitMotif: "prism",
    links: {
      github: "https://github.com/gdg-rvce-demo-sneha",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-sneha",
      website: "https://sneha-demo.example.dev",
    },
  },
  {
    id: "varun-hegde",
    slug: "varun-hegde",
    name: "Varun Hegde",
    role: "Android & Mobile Maintainer",
    vertical: "Dev Vertical",
    accentColor: "blue",
    bio: "Builds offline-first Kotlin and Flutter apps and runs weekend code labs on clean mobile state management.",
    askMeAbout: "Jetpack Compose animations",
    techStack: ["Kotlin", "Jetpack Compose", "Flutter", "SQLite"],
    campusFocus:
      "Running side-by-side Compose and Flutter labs focused on tablet layouts and smooth 60fps scrolling.",
    portraitMask: "arch",
    portraitMotif: "stack",
    links: {
      github: "https://github.com/gdg-rvce-demo-varun",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-varun",
    },
  },
  {
    id: "devika-sharma",
    slug: "devika-sharma",
    name: "Devika Sharma",
    role: "Applied AI Lead",
    vertical: "AI / ML",
    accentColor: "green",
    bio: "Works on tool-calling AI agents, automated test suites, and retrieval pipelines that actually hold up during live demos.",
    askMeAbout: "Tool-calling agents & eval suites",
    techStack: ["Python", "Structured Tools", "Eval Harnesses", "RAG"],
    campusFocus:
      "Teaching structured tool-calling patterns and regression tests during our winter AI workshops.",
    portraitMask: "clover",
    portraitMotif: "nodes",
    links: {
      github: "https://github.com/gdg-rvce-demo-devika",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-devika",
      website: "https://devika-demo.example.dev",
    },
  },
  {
    id: "nikhil-menon",
    slug: "nikhil-menon",
    name: "Nikhil Menon",
    role: "ML Systems Engineer",
    vertical: "AI / ML",
    accentColor: "green",
    bio: "Quantizes open-weights models to run locally on student laptops and maintains clean Python notebooks for study jams.",
    askMeAbout: "Local LLM quantization & ONNX",
    techStack: ["PyTorch", "ONNX", "Quantization", "FastAPI"],
    campusFocus:
      "Benchmarking small local models so AI workshops work smoothly on campus Wi-Fi without needing paid APIs.",
    portraitMask: "scallop",
    portraitMotif: "wave",
    links: {
      github: "https://github.com/gdg-rvce-demo-nikhil",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-nikhil",
    },
  },
  {
    id: "tanvi-desai",
    slug: "tanvi-desai",
    name: "Tanvi Desai",
    role: "Cloud & Infrastructure Lead",
    vertical: "Cloud",
    accentColor: "red",
    bio: "Spends evenings poking at Linux namespaces, Kubernetes clusters, and GitHub Actions pipelines for student projects.",
    askMeAbout: "Linux eBPF & terminal setups",
    techStack: ["Linux Kernel", "Kubernetes", "Rust", "Google Cloud"],
    campusFocus:
      "Leading Linux & Systems Night and helping student teams deploy cleanly on GKE Autopilot.",
    portraitMask: "hexagon",
    portraitMotif: "terminal",
    links: {
      github: "https://github.com/gdg-rvce-demo-tanvi",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-tanvi",
      website: "https://tanvi-demo.example.dev",
    },
  },
  {
    id: "aditya-kulkarni",
    slug: "aditya-kulkarni",
    name: "Aditya Kulkarni",
    role: "DevOps & Observability Core",
    vertical: "Cloud",
    accentColor: "red",
    bio: "Maintains Docker starter templates, OpenTelemetry labs, and zero-downtime deployment guides on Google Cloud.",
    askMeAbout: "Cloud Run, Docker & OpenTelemetry",
    techStack: ["Docker", "OpenTelemetry", "Terraform", "Cloud Run"],
    campusFocus:
      "Writing practical Docker runbooks, health-probe drills, and tracing setups for campus hackathons.",
    portraitMask: "clover",
    portraitMotif: "mesh",
    links: {
      github: "https://github.com/gdg-rvce-demo-aditya",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-aditya",
    },
  },
  {
    id: "meera-nair",
    slug: "meera-nair",
    name: "Meera Nair",
    role: "Design Systems Lead",
    vertical: "Design",
    accentColor: "yellow",
    bio: "Designs clean type scales, component libraries, and high-contrast Light and Dark themes built for readability.",
    askMeAbout: "WCAG AA palettes & design tokens",
    techStack: ["Design Tokens", "Tailwind CSS v4", "Figma", "WCAG AA"],
    campusFocus:
      "Maintaining the chapter component tokens and hosting live accessibility and contrast reviews.",
    portraitMask: "scallop",
    portraitMotif: "compass",
    links: {
      github: "https://github.com/gdg-rvce-demo-meera",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-meera",
      website: "https://meera-demo.example.dev",
    },
  },
  {
    id: "siddharth-rao",
    slug: "siddharth-rao",
    name: "Siddharth Rao",
    role: "Interaction & Motion Designer",
    vertical: "Design",
    accentColor: "yellow",
    bio: "Builds spring-based UI transitions and keyboard shortcuts that feel snappy without weighing down the page.",
    askMeAbout: "Spring physics & micro-interactions",
    techStack: ["Motion Springs", "SVG Geometry", "Accessibility", "React"],
    campusFocus:
      "Crafting interactive demos, view transitions, and keyboard-first UI with lightweight CSS and Motion.",
    portraitMask: "squircle",
    portraitMotif: "kinetic",
    links: {
      github: "https://github.com/gdg-rvce-demo-siddharth",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-siddharth",
    },
  },
];

export function getMemberByName(name: string): TeamMember | undefined {
  return teamMembers.find(
    (member) => member.name.toLowerCase() === name.toLowerCase()
  );
}

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find(
    (member) =>
      member.slug.toLowerCase() === slug.toLowerCase() ||
      member.id.toLowerCase() === slug.toLowerCase()
  );
}

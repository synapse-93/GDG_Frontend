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
    bio: "Coordinates technical tracks, workshop curricula, and open-source campus sprints with a focus on peer-led engineering craft.",
    askMeAbout: "Linux systems & campus sprints",
    techStack: ["TypeScript", "Go", "Linux", "Systems Architecture"],
    campusFocus:
      "Leading the 2026–27 Build Cycle roadmap, multi-branch mentorship circles, and reproducible workshop starter kits across RVCE.",
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
    bio: "Designs reproducible workshop setups, speaker runbooks, and inclusive onboarding paths for first-time campus builders.",
    askMeAbout: "Workshop runbooks & GitHub Actions",
    techStack: ["Python", "GitHub Actions", "Docs-as-Code", "DevEx"],
    campusFocus:
      "Standardizing lab pre-flight checklists and beginner-friendly onboarding tracks so non-CS students ship on day one.",
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
    bio: "Obsessed with TypeScript ergonomics, rendering pipelines, and building accessible web tools that feel instantaneous.",
    askMeAbout: "Next.js perf profiling & a11y",
    techStack: ["Next.js", "React 19", "TypeScript", "Web Performance"],
    campusFocus:
      "Running Web Vitals performance clinics and maintaining open-source campus frontend starter templates.",
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
    bio: "Builds offline-first Kotlin and Flutter applications and runs hands-on labs on declarative state architecture.",
    askMeAbout: "Jetpack Compose animations",
    techStack: ["Kotlin", "Jetpack Compose", "Flutter", "SQLite"],
    campusFocus:
      "Curating side-by-side Compose & Flutter UI labs focused on adaptive tablet layouts and 60fps frame budgets.",
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
    bio: "Explores structured tool-calling agents, evaluation harnesses, and transparent retrieval systems for developer workflows.",
    askMeAbout: "Tool-calling agents & eval suites",
    techStack: ["Python", "Structured Tools", "Eval Harnesses", "RAG"],
    campusFocus:
      "Teaching schema-enforced agent architectures and deterministic regression testing in the Winter AI Studio.",
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
    bio: "Focuses on model quantization, local inference benchmarks, and reproducible Python notebooks for campus study jams.",
    askMeAbout: "Local LLM quantization & ONNX",
    techStack: ["PyTorch", "ONNX", "Quantization", "FastAPI"],
    campusFocus:
      "Benchmarking small open-weights models on student laptops so AI workshops run offline without cloud bottlenecks.",
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
    bio: "Spends evenings poking at Linux namespaces, Kubernetes schedulers, and automated CI pipelines for student projects.",
    askMeAbout: "Linux eBPF & terminal setups",
    techStack: ["Linux Kernel", "Kubernetes", "Rust", "Google Cloud"],
    campusFocus:
      "Leading Linux & Systems Night and mentoring student teams on declarative GKE Autopilot deployments.",
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
    bio: "Maintains container starter templates, OpenTelemetry labs, and zero-downtime deployment guides on Google Cloud.",
    askMeAbout: "Cloud Run, Docker & OpenTelemetry",
    techStack: ["Docker", "OpenTelemetry", "Terraform", "Cloud Run"],
    campusFocus:
      "Building resilient container runbooks, readiness-probe drills, and observability sandboxes for campus hackathons.",
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
    bio: "Crafts typographic scales, editorial grids, and high-contrast Light/Dark interfaces rooted in developer clarity.",
    askMeAbout: "WCAG AA palettes & design tokens",
    techStack: ["Design Tokens", "Tailwind CSS v4", "Figma", "WCAG AA"],
    campusFocus:
      "Stewarding the chapter design token system and running live accessibility & contrast critiques.",
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
    bio: "Pairs spring physics with reduced-motion ergonomics so technical web interfaces feel tactile without heavy runtime cost.",
    askMeAbout: "Spring physics & micro-interactions",
    techStack: ["Motion Springs", "SVG Geometry", "Accessibility", "React"],
    campusFocus:
      "Designing interactive playgrounds, view transitions, and keyboard-first navigation utilities with zero WebGL bloat.",
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

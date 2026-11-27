export type TeamVertical =
  | "Lead & Core"
  | "Dev Vertical"
  | "AI / ML"
  | "Cloud"
  | "Design";

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
  name: string;
  role: string;
  vertical: TeamVertical;
  accentColor: "blue" | "red" | "yellow" | "green";
  bio: string;
  techStack: string[];
  campusFocus: string;
  avatarShape: "cube" | "rings" | "diamond" | "hex";
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
    id: "aarav-krishnamurthy",
    name: "Aarav Krishnamurthy",
    role: "GDG on Campus Organizer",
    vertical: "Lead & Core",
    accentColor: "blue",
    bio: "Coordinates technical tracks, workshop curricula, and open-source campus sprints with a focus on peer-led engineering craft.",
    techStack: ["TypeScript", "Go", "Linux", "Systems Architecture"],
    campusFocus:
      "Leading the 2026–27 Build Cycle roadmap, multi-branch mentorship circles, and reproducible workshop starter kits across RVCE.",
    avatarShape: "rings",
    portraitMotif: "orbit",
    links: {
      github: "https://github.com/gdg-rvce-demo-aarav",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-aarav",
      website: "https://aarav-demo.example.dev",
    },
  },
  {
    id: "kavya-ramachandran",
    name: "Kavya Ramachandran",
    role: "Technical Operations Lead",
    vertical: "Lead & Core",
    accentColor: "blue",
    bio: "Designs reproducible workshop setups, speaker runbooks, and inclusive onboarding paths for first-time campus builders.",
    techStack: ["Python", "GitHub Actions", "Docs-as-Code", "DevEx"],
    campusFocus:
      "Standardizing lab pre-flight checklists and beginner-friendly onboarding tracks so non-CS students ship on day one.",
    avatarShape: "cube",
    portraitMotif: "grid",
    links: {
      github: "https://github.com/gdg-rvce-demo-kavya",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-kavya",
    },
  },
  {
    id: "ananya-venkataraman",
    name: "Ananya Venkataraman",
    role: "Web Architecture Lead",
    vertical: "Dev Vertical",
    accentColor: "blue",
    bio: "Obsessed with TypeScript ergonomics, rendering pipelines, and building accessible web tools that feel instantaneous.",
    techStack: ["Next.js", "React 19", "TypeScript", "Web Performance"],
    campusFocus:
      "Running Web Vitals flamegraph clinics and maintaining open-source campus frontend starter architectures.",
    avatarShape: "hex",
    portraitMotif: "prism",
    links: {
      github: "https://github.com/gdg-rvce-demo-ananya",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-ananya",
      website: "https://ananya-demo.example.dev",
    },
  },
  {
    id: "pranav-hegde",
    name: "Pranav Hegde",
    role: "Android & Mobile Maintainer",
    vertical: "Dev Vertical",
    accentColor: "blue",
    bio: "Builds offline-first Kotlin and Flutter applications and runs hands-on labs on declarative state architecture.",
    techStack: ["Kotlin", "Jetpack Compose", "Flutter", "SQLite"],
    campusFocus:
      "Curating side-by-side Compose & Flutter UI labs focused on adaptive tablet layouts and 60fps frame budgets.",
    avatarShape: "cube",
    portraitMotif: "stack",
    links: {
      github: "https://github.com/gdg-rvce-demo-pranav",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-pranav",
    },
  },
  {
    id: "meera-balasubramanian",
    name: "Meera Balasubramanian",
    role: "Applied AI Lead",
    vertical: "AI / ML",
    accentColor: "green",
    bio: "Explores structured tool-calling agents, evaluation harnesses, and transparent retrieval systems for developer workflows.",
    techStack: ["Python", "Structured Tools", "Eval Harnesses", "RAG"],
    campusFocus:
      "Teaching schema-enforced agent architectures and deterministic regression testing in the Winter AI Studio.",
    avatarShape: "diamond",
    portraitMotif: "nodes",
    links: {
      github: "https://github.com/gdg-rvce-demo-meera",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-meera",
      website: "https://meera-demo.example.dev",
    },
  },
  {
    id: "devansh-iyer",
    name: "Devansh Iyer",
    role: "ML Systems Engineer",
    vertical: "AI / ML",
    accentColor: "green",
    bio: "Focuses on model quantization, local inference benchmarks, and reproducible Python notebooks for campus study jams.",
    techStack: ["PyTorch", "ONNX", "Quantization", "FastAPI"],
    campusFocus:
      "Benchmarking small open-weights models on student laptops so AI workshops run offline without cloud bottlenecks.",
    avatarShape: "rings",
    portraitMotif: "wave",
    links: {
      github: "https://github.com/gdg-rvce-demo-devansh",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-devansh",
    },
  },
  {
    id: "rohan-subramanian",
    name: "Rohan Subramanian",
    role: "Cloud & Infrastructure Lead",
    vertical: "Cloud",
    accentColor: "red",
    bio: "Spends evenings poking at Linux namespaces, Kubernetes schedulers, and automated CI pipelines for student projects.",
    techStack: ["Linux Kernel", "Kubernetes", "Rust", "Google Cloud"],
    campusFocus:
      "Leading Linux & Systems Night and mentoring student teams on declarative GKE Autopilot deployments.",
    avatarShape: "cube",
    portraitMotif: "terminal",
    links: {
      github: "https://github.com/gdg-rvce-demo-rohan",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-rohan",
      website: "https://rohan-demo.example.dev",
    },
  },
  {
    id: "niharika-kulkarni",
    name: "Niharika Kulkarni",
    role: "DevOps & Observability Core",
    vertical: "Cloud",
    accentColor: "red",
    bio: "Maintains container starter templates, OpenTelemetry labs, and zero-downtime deployment guides on Google Cloud.",
    techStack: ["Docker", "OpenTelemetry", "Terraform", "Cloud Run"],
    campusFocus:
      "Building resilient container runbooks, readiness-probe drills, and observability sandboxes for campus hackathons.",
    avatarShape: "hex",
    portraitMotif: "mesh",
    links: {
      github: "https://github.com/gdg-rvce-demo-niharika",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-niharika",
    },
  },
  {
    id: "tara-narayanan",
    name: "Tara Narayanan",
    role: "Design Systems Lead",
    vertical: "Design",
    accentColor: "yellow",
    bio: "Crafts typographic scales, blueprint grids, and high-contrast Light/Dark interfaces rooted in developer clarity.",
    techStack: ["Design Tokens", "Tailwind CSS v4", "Figma", "WCAG AA"],
    campusFocus:
      "Stewarding the Kinetic Campus Almanac token system and running live accessibility & contrast critiques.",
    avatarShape: "diamond",
    portraitMotif: "compass",
    links: {
      github: "https://github.com/gdg-rvce-demo-tara",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-tara",
      website: "https://tara-demo.example.dev",
    },
  },
  {
    id: "siddharth-menon",
    name: "Siddharth Menon",
    role: "Interaction & Motion Designer",
    vertical: "Design",
    accentColor: "yellow",
    bio: "Pairs CSS 3D geometry with reduced-motion ergonomics so technical web interfaces feel tactile without heavy runtime cost.",
    techStack: ["CSS 3D", "SVG Geometry", "Accessibility", "React"],
    campusFocus:
      "Designing pure CSS 3D interactive playgrounds and keyboard-first navigation utilities with zero WebGL bloat.",
    avatarShape: "rings",
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

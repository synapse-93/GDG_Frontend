export type TeamVertical =
  | "Lead & Core"
  | "Dev Vertical"
  | "AI / ML"
  | "Cloud"
  | "Design";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  vertical: TeamVertical;
  accentColor: "blue" | "red" | "yellow" | "green";
  bio: string;
  avatarShape: "cube" | "rings" | "diamond" | "hex";
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
    avatarShape: "rings",
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
    accentColor: "red",
    bio: "Designs reproducible workshop setups, speaker runbooks, and inclusive onboarding paths for first-time campus builders.",
    avatarShape: "cube",
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
    avatarShape: "hex",
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
    accentColor: "green",
    bio: "Builds offline-first Kotlin and Flutter applications and runs hands-on labs on declarative state architecture.",
    avatarShape: "cube",
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
    avatarShape: "diamond",
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
    accentColor: "yellow",
    bio: "Focuses on model quantization, local inference benchmarks, and reproducible Python notebooks for campus study jams.",
    avatarShape: "rings",
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
    avatarShape: "cube",
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
    accentColor: "blue",
    bio: "Maintains container starter templates, OpenTelemetry labs, and zero-downtime deployment guides on Google Cloud.",
    avatarShape: "hex",
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
    avatarShape: "diamond",
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
    accentColor: "green",
    bio: "Pairs CSS 3D geometry with reduced-motion ergonomics so technical web interfaces feel tactile without heavy runtime cost.",
    avatarShape: "rings",
    links: {
      github: "https://github.com/gdg-rvce-demo-siddharth",
      linkedin: "https://www.linkedin.com/in/gdg-rvce-demo-siddharth",
    },
  },
];

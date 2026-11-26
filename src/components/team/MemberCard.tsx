import { Briefcase, Code2, Globe } from "lucide-react";
import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import type { TeamMember } from "@/data/team";
import { ACCENT_STYLES } from "@/lib/accents";

interface MemberCardProps {
  member: TeamMember;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function MemberCard({ member }: MemberCardProps) {
  const accent = ACCENT_STYLES[member.accentColor];
  const initials = getInitials(member.name);

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform duration-200 hover:-translate-y-0.5 ${accent.borderHover}`}
    >
      {/* Top accent hairline */}
      <div aria-hidden="true" className={`h-1 w-full ${accent.bar}`} />

      {/* Emblem / Avatar header */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden border-b border-hairline bg-blueprint-grid">
        <span
          aria-hidden="true"
          className="absolute top-3 left-3 rounded-md border border-hairline bg-surface/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-ink-muted"
        >
          {initials}
        </span>

        {member.imagePath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.imagePath}
            alt={member.name}
            className="h-24 w-24 rounded-full border border-hairline object-cover"
          />
        ) : (
          <div className="pointer-events-none flex h-28 w-28 items-center justify-center overflow-hidden">
            <GeometricScene3D
              variant={member.avatarShape}
              accentColor={member.accentColor}
              size="md"
            />
          </div>
        )}
      </div>

      {/* Builder Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${accent.badge}`}
          >
            {member.vertical}
          </span>
        </div>

        <h3 className="mt-3 text-base font-bold tracking-tight text-ink">
          {member.name}
        </h3>

        <p className="mt-1 font-mono text-xs text-ink-muted">{member.role}</p>

        <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-muted">
          {member.bio}
        </p>

        {/* Accessible Social Icon Links */}
        <div className="mt-4 flex items-center gap-2 border-t border-hairline pt-4">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              title="GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {member.links.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              title="LinkedIn"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          {member.links.website && (
            <a
              href={member.links.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}'s website`}
              title="Website"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-hairline bg-canvas text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4285F4]"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

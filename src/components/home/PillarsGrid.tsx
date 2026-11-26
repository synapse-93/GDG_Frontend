import { GeometricScene3D } from "@/components/brand/GeometricScene3D";
import { siteConfig } from "@/data/site";
import { ACCENT_STYLES } from "@/lib/accents";

export function PillarsGrid() {
  return (
    <section
      aria-labelledby="pillars-heading"
      className="border-b border-hairline bg-canvas py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-muted">
            {"02 // TECHNICAL VERTICALS"}
          </p>
          <h2
            id="pillars-heading"
            className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            Four tracks. One open engineering studio.
          </h2>
          <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
            Every semester is anchored around practical labs, architecture
            clinics, and open-source starter kits across four Google developer
            disciplines.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.pillars.map((pillar) => {
            const accent = ACCENT_STYLES[pillar.accentColor];
            return (
              <article
                key={pillar.index}
                className={`flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform duration-200 hover:-translate-y-0.5 ${accent.borderHover}`}
              >
                <div aria-hidden="true" className={`h-1 w-full ${accent.bar}`} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-ink-muted">
                      {`${pillar.index} //`}
                    </span>
                    <div className="pointer-events-none flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-hairline bg-canvas">
                      <GeometricScene3D
                        variant={pillar.geometryVariant}
                        accentColor={pillar.accentColor}
                        size="sm"
                      />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

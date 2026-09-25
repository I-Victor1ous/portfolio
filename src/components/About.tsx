import { profile } from "@/src/data/profile";
import { SectionHeader } from "@/src/components/SectionHeader";
import { SkillsGrid } from "@/src/components/SkillsGrid";

export function About() {
  const hasAbout = profile.about.trim().length > 0;

  return (
    <section
      id="about"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8"
    >
      <SectionHeader title="About" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="rounded-2xl border border-line bg-panel p-6 shadow-glow sm:p-8">
          {hasAbout ? (
            <p className="text-lg leading-relaxed text-ink">{profile.about}</p>
          ) : (
            <p className="text-lg leading-relaxed text-mute">
              Add a short bio in{" "}
              <code className="text-sm text-ink">content/profile.json</code>.
            </p>
          )}
          <dl className="mt-6 grid gap-3 border-t border-line pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-mute">Based in</dt>
              <dd className="mt-0.5 font-medium text-ink">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-mute">Focus</dt>
              <dd className="mt-0.5 font-medium text-ink">
                Full-stack · product-minded engineering
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-panel/60 p-6 sm:p-8">
          <h3 className="text-sm font-medium tracking-wide text-mute uppercase">
            Skills
          </h3>
          <p className="mt-2 text-xs text-mute">Hover an icon to see the name</p>
          <div className="mt-6">
            <SkillsGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

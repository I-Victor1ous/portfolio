import { Code2 } from "lucide-react";
import {
  dedupeSkills,
  skillIconNeedsLightTile,
  skillIconUrl,
} from "@/src/lib/skill-icons";
import { profile } from "@/src/data/profile";

function SkillTile({ label }: { label: string }) {
  const iconUrl = skillIconUrl(label);
  const lightTile = skillIconNeedsLightTile(label);

  return (
    <li
      tabIndex={0}
      className="group flex flex-col items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-canvas shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/45 group-hover:shadow-md group-focus-within:-translate-y-0.5 group-focus-within:border-accent/45">
        <div
          className={
            lightTile
              ? "flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1.5 ring-1 ring-black/5 dark:bg-zinc-100 dark:ring-white/20"
              : "flex h-10 w-10 items-center justify-center"
          }
        >
          {iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- external brand SVG CDN
            <img
              src={iconUrl}
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <Code2 className="h-7 w-7 text-accent-dim" aria-hidden />
          )}
        </div>
      </div>
      <p className="max-h-0 overflow-hidden text-center text-xs font-medium text-ink opacity-0 transition-all duration-200 group-hover:max-h-8 group-hover:opacity-100 group-focus-within:max-h-8 group-focus-within:opacity-100">
        {label}
      </p>
      <span className="sr-only">{label}</span>
    </li>
  );
}

export function SkillsGrid() {
  const skills = dedupeSkills(profile.skills);

  return (
    <ul className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5">
      {skills.map((skill) => (
        <SkillTile key={skill} label={skill} />
      ))}
    </ul>
  );
}

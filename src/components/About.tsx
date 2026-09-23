import { profile } from "@/src/data/profile";

export function About() {
  const hasAbout = profile.about.trim().length > 0;

  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8">
      <h2 className="text-sm tracking-[0.18em] text-accent-dim uppercase">
        {hasAbout ? "About" : "Skills"}
      </h2>
      {hasAbout ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">
          {profile.about}
        </p>
      ) : null}
      <ul className={`flex flex-wrap gap-2 ${hasAbout ? "mt-8" : "mt-4"}`}>
        {profile.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-line bg-panel px-3 py-1 text-sm text-ink"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

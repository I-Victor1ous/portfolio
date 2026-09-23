import { ResumeDownloadLink } from "@/src/components/ResumeDownloadLink";
import { profile } from "@/src/data/profile";

export function Experience({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8"
    >
      <h2 className="text-sm tracking-[0.18em] text-accent-dim uppercase">
        Experience
      </h2>
      {resumeAvailable ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3">
          <p className="text-sm text-mute">
            Prefer a PDF? Download a copy of my resume.
          </p>
          <ResumeDownloadLink variant="secondary" label="PDF resume" />
        </div>
      ) : null}
      <ol className="mt-8 space-y-6">
        {profile.experience.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className="rounded-2xl border border-line bg-panel p-6 shadow-glow"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg text-ink">
                {job.title}
                <span className="text-mute"> · {job.company}</span>
              </h3>
              <p className="text-sm text-mute">
                {job.start} — {job.end}
              </p>
            </div>
            <p className="mt-1 text-sm text-mute">{job.location}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mute">
              {job.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h2 className="mt-16 text-sm tracking-[0.18em] text-accent-dim uppercase">
        Education
      </h2>
      <ol className="mt-6 space-y-6">
        {profile.education.map((item) => (
          <li
            key={`${item.school}-${item.credential}-${item.year}`}
            className="rounded-2xl border border-line bg-panel p-6 shadow-glow"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg text-ink">
                {item.credential}
                <span className="text-mute"> · {item.school}</span>
              </h3>
              <p className="text-sm text-mute">{item.year}</p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-mute">
              {item.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

import type { ReactNode } from "react";
import { SectionHeader } from "@/src/components/SectionHeader";
import { ResumeDownloadLink } from "@/src/components/ResumeDownloadLink";
import { profile } from "@/src/data/profile";

function Timeline({
  items,
}: {
  items: Array<{
    key: string;
    start: string;
    end: string;
    title: ReactNode;
    subtitle?: string;
    body: ReactNode;
  }>;
}) {
  return (
    <ol className="relative mt-6 space-y-6 border-l border-line pl-6 sm:pl-8">
      {items.map((item) => (
        <li
          key={item.key}
          className="relative before:absolute before:-left-[1.55rem] before:top-8 before:h-2.5 before:w-2.5 before:rounded-full before:border-2 before:border-panel before:bg-accent sm:before:-left-[2.05rem]"
        >
          <p className="absolute -left-6 top-7 w-14 -translate-x-full text-right text-xs font-medium tabular-nums text-accent-dim sm:-left-8 sm:w-16 sm:text-sm">
            {item.start}
          </p>
          <div className="rounded-2xl border border-line bg-panel p-6 shadow-glow">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg text-ink">{item.title}</h4>
              <p className="text-sm text-mute">
                End: <span className="text-ink">{item.end}</span>
              </p>
            </div>
            {item.subtitle ? (
              <p className="mt-1 text-sm text-mute">{item.subtitle}</p>
            ) : null}
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-mute">
              {item.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Experience({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8 sm:pl-28"
    >
      <SectionHeader title="Experience & education" />
      {resumeAvailable ? (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-panel/60 px-4 py-3">
          <p className="text-sm text-mute">
            Prefer a PDF? Download a copy of my resume.
          </p>
          <ResumeDownloadLink variant="secondary" label="PDF resume" />
        </div>
      ) : null}

      <h3 className="mt-12 text-sm font-medium tracking-[0.14em] text-accent-dim uppercase">
        Work
      </h3>
      <Timeline
        items={profile.experience.map((job) => ({
          key: `${job.company}-${job.start}`,
          start: job.start,
          end: job.end,
          title: (
            <>
              {job.title}
              <span className="text-mute"> · {job.company}</span>
            </>
          ),
          subtitle: job.location,
          body: job.highlights.map((line) => <p key={line}>{line}</p>),
        }))}
      />

      <h3 className="mt-16 text-sm font-medium tracking-[0.14em] text-accent-dim uppercase">
        Education
      </h3>
      <Timeline
        items={profile.education.map((item) => ({
          key: `${item.school}-${item.credential}-${item.start}`,
          start: item.start,
          end: item.end,
          title: (
            <>
              {item.credential}
              <span className="text-mute"> · {item.school}</span>
            </>
          ),
          body: item.details.map((line) => <p key={line}>{line}</p>),
        }))}
      />
    </section>
  );
}

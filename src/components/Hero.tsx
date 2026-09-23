import { Github, Linkedin, Mail } from "lucide-react";
import { ResumeDownloadLink } from "@/src/components/ResumeDownloadLink";
import { profile } from "@/src/data/profile";

export function Hero({
  githubUsername,
  resumeAvailable,
}: {
  githubUsername: string;
  resumeAvailable: boolean;
}) {
  return (
    <section
      id="top"
      className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24"
    >
      <p className="text-sm tracking-[0.18em] text-accent-dim uppercase">
        {profile.role} · {profile.location}
      </p>
      <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-ink sm:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
        {profile.headline}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Email
        </a>
        {resumeAvailable ? <ResumeDownloadLink variant="primary" /> : null}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Linkedin className="h-4 w-4" aria-hidden />
          LinkedIn
        </a>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </a>
      </div>
    </section>
  );
}

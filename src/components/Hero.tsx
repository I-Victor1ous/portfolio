import { Github, Linkedin, Mail } from "lucide-react";
import { HeroTypewriter } from "@/src/components/HeroTypewriter";
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
      className="relative overflow-hidden border-b border-line/60"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(13,148,136,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(94,234,212,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <p className="inline-flex rounded-full border border-line bg-panel/80 px-3 py-1 text-xs tracking-wide text-mute backdrop-blur-sm">
          {profile.location}
        </p>
        <HeroTypewriter />
        <p className="mt-6 max-w-xl text-lg font-medium text-mute sm:text-xl">
          {profile.headline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-canvas shadow-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
          {resumeAvailable ? <ResumeDownloadLink variant="primary" /> : null}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-5 py-2.5 text-sm text-ink backdrop-blur-sm transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-5 py-2.5 text-sm text-ink backdrop-blur-sm transition-colors hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

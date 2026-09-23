"use client";

import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { ResumeDownloadLink } from "@/src/components/ResumeDownloadLink";
import { profile } from "@/src/data/profile";

export function Contact({
  githubUsername,
  resumeAvailable,
}: {
  githubUsername: string;
  resumeAvailable: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8"
    >
      <h2 className="text-sm tracking-[0.18em] text-accent-dim uppercase">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-lg text-mute">
        Get in touch with me via email or LinkedIn! Open to new opportunities and collaborations.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-canvas transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy email"}
        </button>
        {resumeAvailable ? <ResumeDownloadLink variant="primary" /> : null}
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Linkedin className="h-4 w-4" aria-hidden />
          LinkedIn
        </a>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Github className="h-4 w-4" aria-hidden />
          GitHub
        </a>
      </div>
    </section>
  );
}

import { About } from "@/src/components/About";
import { Contact } from "@/src/components/Contact";
import { Experience } from "@/src/components/Experience";
import { Hero } from "@/src/components/Hero";
import { Nav } from "@/src/components/Nav";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { profile } from "@/src/data/profile";
import { getGithubProjects } from "@/src/lib/github";
import { isResumeAvailable } from "@/src/lib/resume.server";
import {
  getResumeDownloadHref,
  isResumeLinkAvailable,
} from "@/src/lib/resume-public";

export const dynamic = "force-dynamic";

export default async function Home() {
  const github = await getGithubProjects();
  const localResume = isResumeAvailable();
  const resumeHref = getResumeDownloadHref(localResume);
  const resumeAvailable = isResumeLinkAvailable(localResume);
  const year = new Date().getFullYear();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero
          githubUsername={github.username}
          resumeAvailable={resumeAvailable}
          resumeHref={resumeHref}
        />
        <About />
        <Experience
          resumeAvailable={resumeAvailable}
          resumeHref={resumeHref}
        />
        <ProjectsSection
          initial={{
            username: github.username,
            repos: github.repos,
            source: github.source,
            fetchedAt: new Date().toISOString(),
          }}
        />
        <Contact
          githubUsername={github.username}
          resumeAvailable={resumeAvailable}
          resumeHref={resumeHref}
        />
      </main>
      <footer className="mx-auto max-w-5xl border-t border-line px-5 py-8 text-sm text-mute sm:px-8">
        <p>
          © {year} {profile.name}. last
          updated {new Date().toISOString().slice(0, 10)}.
        </p>
      </footer>
    </>
  );
}

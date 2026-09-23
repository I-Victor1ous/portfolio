import { About } from "@/src/components/About";
import { Contact } from "@/src/components/Contact";
import { Experience } from "@/src/components/Experience";
import { Hero } from "@/src/components/Hero";
import { Nav } from "@/src/components/Nav";
import { ProjectGrid } from "@/src/components/ProjectGrid";
import { profile } from "@/src/data/profile";
import { getGithubProjects } from "@/src/lib/github";
import { isResumeAvailable } from "@/src/lib/resume.server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const github = await getGithubProjects();
  const resumeAvailable = isResumeAvailable();
  const year = new Date().getFullYear();

  return (
    <>
      <Nav />
      <main id="main">
        <Hero githubUsername={github.username} resumeAvailable={resumeAvailable} />
        <About />
        <Experience resumeAvailable={resumeAvailable} />
        <ProjectGrid
          repos={github.repos}
          username={github.username}
          source={github.source}
          error={github.error}
        />
        <Contact
          githubUsername={github.username}
          resumeAvailable={resumeAvailable}
        />
      </main>
      <footer className="mx-auto max-w-5xl border-t border-line px-5 py-8 text-sm text-mute sm:px-8">
        <p>
          © {year} {profile.name}. Sample content for a personal site · last
          updated {new Date().toISOString().slice(0, 10)}.
        </p>
      </footer>
    </>
  );
}

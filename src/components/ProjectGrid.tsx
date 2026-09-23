"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Pin, Star } from "lucide-react";
import type { GithubRepo } from "@/src/lib/github";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ProjectGrid({
  repos,
  username,
  source,
  error,
}: {
  repos: GithubRepo[];
  username: string;
  source: "graphql+rest" | "rest";
  error: string | null;
}) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const languages = useMemo(() => {
    const set = new Set(
      repos.map((r) => r.language).filter((l): l is string => Boolean(l)),
    );
    return Array.from(set).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos.filter((repo) => {
      const matchesQuery =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        (repo.description?.toLowerCase().includes(q) ?? false);
      const matchesLang = language === "all" || repo.language === language;
      return matchesQuery && matchesLang;
    });
  }, [repos, query, language]);

  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-sm tracking-[0.18em] text-accent-dim uppercase">
            Projects
          </h2>
          <p className="mt-3 max-w-xl text-mute">
            Public repositories for{" "}
            <a
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{username}
            </a>
            . Pinned work is listed first
            {source === "rest"
              ? " (from profile fallback names until a GitHub token enables live pin order)"
              : ""}
            .
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex-1 text-sm text-mute">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or description"
            className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-ink placeholder:text-mute/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
        </label>
        <label className="text-sm text-mute sm:w-48">
          <span className="sr-only">Filter by language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <option value="all">All languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error ? (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-900 dark:bg-red-950/40 dark:text-red-200">
          Could not load GitHub projects ({error}). Confirm{" "}
          <code className="text-xs">githubUsername</code> in{" "}
          <code className="text-xs">content/profile.json</code>, create{" "}
          <code className="text-xs">.env.local</code> with a read-only{" "}
          <code className="text-xs">GITHUB_TOKEN</code> if you see rate limits,
          then restart <code className="text-xs">npm run dev</code>.
        </p>
      ) : null}

      {filtered.length === 0 && !error ? (
        <p className="mt-8 text-sm text-mute">No repositories match that filter.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((repo) => {
            const expanded = open === repo.name;
            return (
              <li
                key={repo.name}
                className="flex flex-col rounded-2xl border border-line bg-panel p-5 shadow-glow transition-colors hover:border-accent/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg text-ink">{repo.name}</h3>
                  {repo.pinned ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      <Pin className="h-3 w-3" aria-hidden />
                      Pinned
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-mute">
                  {repo.description || "No description."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-mute">
                  {repo.language ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full bg-accent"
                        style={
                          repo.languageColor
                            ? { backgroundColor: repo.languageColor }
                            : undefined
                        }
                        aria-hidden
                      />
                      {repo.language}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" aria-hidden />
                    {repo.stars}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    Repository
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                  {repo.homepageUrl ? (
                    <a
                      href={repo.homepageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
                    >
                      Live site
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="ml-auto inline-flex items-center gap-1 text-mute hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    aria-expanded={expanded}
                    onClick={() =>
                      setOpen((current) =>
                        current === repo.name ? null : repo.name,
                      )
                    }
                  >
                    Details
                    <ChevronDown
                      className={`h-4 w-4 transition-transform motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </div>
                {expanded ? (
                  <div className="mt-4 border-t border-line pt-4 text-sm text-mute">
                    <p>Updated {formatDate(repo.updatedAt)}</p>
                    {repo.topics.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {repo.topics.map((topic) => (
                          <li
                            key={topic}
                            className="rounded-full border border-line px-2 py-0.5 text-xs"
                          >
                            {topic}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs">No topics listed.</p>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

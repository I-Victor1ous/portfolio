"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  RefreshCw,
  Star,
} from "lucide-react";
import { SectionHeader } from "@/src/components/SectionHeader";
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
  syncedLabel,
  refreshing,
  onRefresh,
}: {
  repos: GithubRepo[];
  username: string;
  source: "graphql+rest" | "rest";
  syncedLabel?: string | null;
  refreshing?: boolean;
  onRefresh?: () => void;
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
      className="scroll-mt-24 border-t border-line bg-panel/40 px-5 py-16 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          title="Projects"
          description={
            <>
              Pinned repositories from{" "}
              <a
                className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-accent"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{username}
              </a>
              {source === "graphql+rest"
                ? " — same order as on your GitHub profile."
                : " — set GITHUB_TOKEN for live pin order from GitHub."}
            </>
          }
          action={
            onRefresh ? (
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent/40 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                  aria-hidden
                />
                Refresh
              </button>
            ) : null
          }
        />

        {syncedLabel ? (
          <p className="mt-2 text-xs text-mute">
            Last synced {syncedLabel}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="flex-1 text-sm text-mute">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or description"
              className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-ink shadow-sm placeholder:text-mute/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
          </label>
          <label className="text-sm text-mute sm:w-48">
            <span className="sr-only">Filter by language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-line bg-panel px-4 py-2.5 text-ink shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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

        {filtered.length === 0 ? (
          <p className="mt-8 text-sm text-mute">
            {repos.length === 0
              ? "Projects will appear here once GitHub pins are loaded. Try Refresh in a moment."
              : "No repositories match that filter."}
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {filtered.map((repo) => {
              const expanded = open === repo.name;
              return (
                <li
                  key={repo.url}
                  className="group flex flex-col rounded-2xl border border-line bg-panel p-5 shadow-glow transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-medium text-ink">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {repo.name}
                        <ArrowUpRight
                          className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </a>
                    </h3>
                  </div>
                  <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-mute">
                    {repo.description || "No description."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-mute">
                    {repo.language ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-2 py-0.5">
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
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-3 py-1 text-ink transition-colors hover:border-accent/50"
                    >
                      Code
                    </a>
                    {repo.homepageUrl ? (
                      <a
                        href={repo.homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-accent-dim transition-colors hover:bg-accent/15"
                      >
                        Live demo
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
                      <p className="mt-1 break-all text-xs opacity-80">
                        {repo.url}
                      </p>
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
      </div>
    </section>
  );
}

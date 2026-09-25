"use client";

import { useCallback, useState } from "react";
import { ProjectGrid } from "@/src/components/ProjectGrid";
import type { GithubRepo } from "@/src/lib/github";

type GithubPayload = {
  username: string;
  repos: GithubRepo[];
  source: "graphql+rest" | "rest";
  fetchedAt?: string;
};

export function ProjectsSection({
  initial,
}: {
  initial: GithubPayload;
}) {
  const [data, setData] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/github/projects", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as GithubPayload & { error?: string | null };
      if (json.repos?.length > 0 || !initial.repos.length) {
        setData({
          username: json.username,
          repos: json.repos ?? [],
          source: json.source,
          fetchedAt: json.fetchedAt,
        });
      }
    } catch {
      /* keep last good data */
    } finally {
      setRefreshing(false);
    }
  }, [initial.repos.length]);

  const syncedLabel = data.fetchedAt
    ? new Intl.DateTimeFormat("en-AU", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(data.fetchedAt))
    : null;

  return (
    <ProjectGrid
      repos={data.repos}
      username={data.username}
      source={data.source}
      syncedLabel={syncedLabel}
      refreshing={refreshing}
      onRefresh={() => void refresh()}
    />
  );
}

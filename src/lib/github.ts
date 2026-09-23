import { profile } from "@/src/data/profile";
import { githubFetch } from "@/src/lib/github-fetch";

const REVALIDATE_SECONDS = 60 * 60;
const USER_AGENT = "personal-web-portfolio";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  updatedAt: string;
  language: string | null;
  languageColor: string | null;
  topics: string[];
  pinned: boolean;
};

type RestRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  language: string | null;
  topics?: string[];
};

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

function buildRepoLookups(repos: RestRepo[]) {
  const byName = new Map<string, RestRepo>();
  const byFullName = new Map<string, RestRepo>();
  for (const repo of repos) {
    byName.set(normalizeKey(repo.name), repo);
    byFullName.set(normalizeKey(repo.full_name), repo);
  }
  return { byName, byFullName };
}

/** Matches repo name or `owner/repo` entries from profile.pinnedRepoNames. */
function findPinnedRepo(
  entry: string,
  login: string,
  lookups: ReturnType<typeof buildRepoLookups>,
): RestRepo | undefined {
  const key = normalizeKey(entry);
  const fromFull = lookups.byFullName.get(key);
  if (fromFull) return fromFull;

  const fromName = lookups.byName.get(key);
  if (fromName) return fromName;

  const shortName = key.includes("/") ? key.split("/").pop()! : key;
  return (
    lookups.byName.get(shortName) ??
    lookups.byFullName.get(`${normalizeKey(login)}/${shortName}`)
  );
}

type PinnedNode = {
  name?: string;
  description?: string | null;
  url?: string;
  homepageUrl?: string | null;
  stargazerCount?: number;
  updatedAt?: string;
  primaryLanguage?: { name: string; color: string | null } | null;
  repositoryTopics?: { nodes?: Array<{ topic?: { name?: string } }> };
};

function fetchCacheOptions(): RequestInit {
  if (process.env.NODE_ENV === "development") {
    return { cache: "no-store" };
  }
  return { next: { revalidate: REVALIDATE_SECONDS } };
}

function formatGithubError(err: unknown): string {
  const message = err instanceof Error ? err.message : "Unknown GitHub error";
  const cause = err instanceof Error && "cause" in err ? err.cause : null;
  const causeCode =
    cause && typeof cause === "object" && "code" in cause
      ? String(cause.code)
      : "";

  if (
    message.includes("fetch failed") ||
    causeCode.includes("UNABLE_TO_VERIFY_LEAF_SIGNATURE") ||
    causeCode.includes("CERT")
  ) {
    return `${message} — Node cannot verify GitHub's TLS certificate on this network. Stop the dev server and run npm run dev again (Windows syncs trusted CAs automatically).`;
  }

  return message;
}

function githubUsername() {
  return process.env.GITHUB_USERNAME?.trim() || profile.githubUsername;
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": USER_AGENT,
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function fromPinnedNode(node: PinnedNode): GithubRepo | null {
  if (!node.name || !node.url) return null;
  return {
    name: node.name,
    description: node.description ?? null,
    url: node.url,
    homepageUrl: node.homepageUrl || null,
    stars: node.stargazerCount ?? 0,
    updatedAt: node.updatedAt ?? new Date().toISOString(),
    language: node.primaryLanguage?.name ?? null,
    languageColor: node.primaryLanguage?.color ?? null,
    topics:
      node.repositoryTopics?.nodes
        ?.map((n) => n.topic?.name)
        .filter((n): n is string => Boolean(n)) ?? [],
    pinned: true,
  };
}

function fromRest(repo: RestRepo, pinned: boolean): GithubRepo {
  return {
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    homepageUrl: repo.homepage || null,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    language: repo.language,
    languageColor: null,
    topics: repo.topics ?? [],
    pinned,
  };
}

async function fetchPinnedViaGraphQl(login: string): Promise<GithubRepo[] | null> {
  if (!process.env.GITHUB_TOKEN?.trim()) return null;

  const query = `
    query ($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              stargazerCount
              updatedAt
              primaryLanguage { name color }
              repositoryTopics(first: 8) {
                nodes { topic { name } }
              }
            }
          }
        }
      }
    }
  `;

  const res = await githubFetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login } }),
    ...fetchCacheOptions(),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    data?: { user?: { pinnedItems?: { nodes?: Array<PinnedNode | null> } } };
    errors?: { message: string }[];
  };

  if (json.errors?.length || !json.data?.user) return null;

  return (json.data.user.pinnedItems?.nodes ?? [])
    .map((node) => (node ? fromPinnedNode(node) : null))
    .filter((repo): repo is GithubRepo => repo !== null);
}

async function fetchOwnerRepos(login: string): Promise<RestRepo[]> {
  const res = await githubFetch(
    `https://api.github.com/users/${encodeURIComponent(login)}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers: authHeaders(),
      ...fetchCacheOptions(),
    },
  );

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        `GitHub user "${login}" not found — check githubUsername in content/profile.json`,
      );
    }
    if (res.status === 403) {
      throw new Error(
        "GitHub rate limit (403) — add GITHUB_TOKEN to .env.local (see .env.example)",
      );
    }
    throw new Error(`GitHub REST failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as RestRepo[];
}

export async function getGithubProjects(): Promise<{
  username: string;
  repos: GithubRepo[];
  source: "graphql+rest" | "rest";
  error: string | null;
}> {
  const username = githubUsername();

  try {
    const restRepos = await fetchOwnerRepos(username);
    const pinnedFromGraphql = await fetchPinnedViaGraphQl(username);

    const lookups = buildRepoLookups(restRepos);

    const pinned: GithubRepo[] = [];
    if (pinnedFromGraphql && pinnedFromGraphql.length > 0) {
      pinned.push(...pinnedFromGraphql);
    } else {
      for (const name of profile.pinnedRepoNames) {
        const match = findPinnedRepo(name, username, lookups);
        if (match) pinned.push(fromRest(match, true));
      }
    }

    const pinnedSet = new Set(pinned.map((r) => r.name));
    const rest = restRepos
      .filter((r) => !r.fork && !pinnedSet.has(r.name))
      .map((r) => fromRest(r, false));

    return {
      username,
      repos: [...pinned, ...rest],
      source:
        pinnedFromGraphql && pinnedFromGraphql.length > 0
          ? "graphql+rest"
          : "rest",
      error: null,
    };
  } catch (err) {
    return { username, repos: [], source: "rest", error: formatGithubError(err) };
  }
}

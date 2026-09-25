const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/** Familiar multi-color logos (Devicon) — overrides Simple Icons where those are clearer. */
const DEVICON_BY_KEY: Record<string, string> = {
  java: `${DEVICON_BASE}/java/java-original.svg`,
  css: `${DEVICON_BASE}/css3/css3-original.svg`,
  html: `${DEVICON_BASE}/html5/html5-original.svg`,
  c: `${DEVICON_BASE}/c/c-original.svg`,
  cplusplus: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
  javascript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  typescript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  react: `${DEVICON_BASE}/react/react-original.svg`,
  nextjs: `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  nodejs: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  python: `${DEVICON_BASE}/python/python-original.svg`,
  postgresql: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  git: `${DEVICON_BASE}/git/git-original.svg`,
  bootstrap: `${DEVICON_BASE}/bootstrap/bootstrap-original.svg`,
  expressjs: `${DEVICON_BASE}/express/express-original.svg`,
};

/** Simple Icons: slug + brand hex (visible on dark UI without a light tile). */
const SIMPLE_ICON: Record<string, { slug: string; color: string }> = {
  tailwindcss: { slug: "tailwindcss", color: "06B6D4" },
  tailwind: { slug: "tailwindcss", color: "06B6D4" },
  vercel: { slug: "vercel", color: "FFFFFF" },
};

export function skillKey(label: string): string {
  return label
    .toLowerCase()
    .replace(/\++/g, "plusplus")
    .replace(/\./g, "")
    .replace(/\s+/g, "");
}

export function skillIconUrl(label: string): string | null {
  const key = skillKey(label);

  if (DEVICON_BY_KEY[key]) {
    return DEVICON_BY_KEY[key];
  }

  const simple = SIMPLE_ICON[key];
  if (simple) {
    return `https://cdn.simpleicons.org/${simple.slug}/${simple.color}`;
  }

  return null;
}

export function skillIconNeedsLightTile(label: string): boolean {
  const key = skillKey(label);
  return Boolean(DEVICON_BY_KEY[key]) || key === "vercel";
}

/** One tile per unique icon key (e.g. Tailwind + Tailwind CSS). */
export function dedupeSkills(skills: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const skill of skills) {
    const key = skillKey(skill);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(skill);
  }
  return out;
}

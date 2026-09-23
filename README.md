# Personal site

Dark, recruiter-friendly portfolio: resume-style copy plus GitHub repositories with **pinned projects first**. Sample identity is **Jordan Hale**; GitHub projects currently load from **octocat**. Swap both when you are ready.

## Local run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional local env (copy [`.env.example`](.env.example) to `.env.local` — never commit real tokens):

```
GITHUB_TOKEN=github_pat_your_token
GITHUB_USERNAME=octocat
```

`GITHUB_TOKEN` should be a [fine-grained personal access token](https://github.com/settings/personal-access-tokens) with **read-only** access to public repositories. It unlocks GitHub GraphQL (true pin order) and a higher REST rate limit. Without it, the site uses public REST plus `pinnedRepoNames` in [`content/profile.json`](content/profile.json).

If `npm install` fails with a certificate error, do **not** turn off TLS. Use your org’s trusted CA (for example `NODE_EXTRA_CA_CERTS` pointing at the company root certificate) so Node can verify npm and GitHub.

## Edit your information (no code)

All copy lives in **[`content/profile.json`](content/profile.json)** — name, bio, jobs, education, skills, links, GitHub username, and nav initials. See [`content/README.md`](content/README.md) for field descriptions. Save the file and refresh; you do not need to edit TypeScript for text changes.

## Resume PDF (not on GitHub)

1. Save your file as **`private/resume.pdf`** (this path is **gitignored**).
2. Restart or refresh dev — **Download resume** appears in the hero, experience banner, and contact when the file exists.
3. Downloads go through **`/api/resume`** with a friendly filename (e.g. `Jordan-Hale-Resume.pdf`).

Git-based Vercel deploys do not include gitignored files. To serve the PDF in production, deploy from your machine with the file present (`vercel deploy --prod`) or use another hosting approach — details in [`private/README.md`](private/README.md).

## Host on Vercel (recommended)

1. Create a GitHub repository for this folder and push `main`.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo. Framework preset: **Next.js**.
3. In **Environment Variables**, add `GITHUB_TOKEN` (and `GITHUB_USERNAME` if it should differ from `profile.json`). Do not paste tokens into the repo.
4. Deploy. Later: **Settings → Domains** for a custom domain.

## Alternatives

| Host | Notes |
| --- | --- |
| **Netlify** | Next runtime; same env vars. |
| **Cloudflare Pages** | Use OpenNext for Cloudflare, or static-export if you snapshot GitHub at build. |
| **GitHub Pages** | Needs `output: 'export'` and build-time GitHub fetch; live pin order is weaker. |

Prefer Vercel unless you already operate another dashboard.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

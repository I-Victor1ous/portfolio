# Site content

Edit **`profile.json`** to change everything recruiters see: name, bio, jobs, education, skills, links, and GitHub username.

## Fields

| Field | Purpose |
| --- | --- |
| `navInitials` | Short label in the top nav (e.g. `"IC"`) |
| `name`, `role`, `location`, `headline`, `about` | Hero and About sections |
| `email`, `linkedin` | Contact links |
| `githubUsername` | GitHub profile and project fetch (override with `GITHUB_USERNAME` env) |
| `pinnedRepoNames` | Repo names (or `owner/repo`) shown first when GraphQL pins are unavailable — must be **your** public repos |
| `skills` | Tag list under About |
| `experience` | Array of jobs with `highlights` bullet strings |
| `education` | Array of schools; each entry has `details` (bullet strings, like job highlights) |

Save the file and refresh the dev server. No TypeScript edits required for copy changes.

Resume PDF is **not** in this file — add `private/resume.pdf` (see [`private/README.md`](../private/README.md)).

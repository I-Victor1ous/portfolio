# Private resume file

Place your PDF here as **`resume.pdf`**.

This folder’s PDF is **gitignored** so your resume is not pushed to GitHub. The site serves it only through **Download resume** (`/api/resume`).

## Local development

1. Copy your file to `private/resume.pdf`.
2. Run `npm run dev` — the download button appears when the file exists.

## Production (Vercel)

Git-based deploys **do not** include gitignored files. To ship the PDF on Vercel you can:

- Deploy from your machine with the CLI (`vercel deploy --prod`) while `private/resume.pdf` is present, or
- Host the PDF elsewhere and add a download link in `content/profile.json` later (custom change), or
- Use Vercel’s dashboard / storage options if you adopt blob storage.

After adding the file locally, redeploy so the server can read it.

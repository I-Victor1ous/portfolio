import fs from "fs";
import path from "path";

const RESUME_FILENAME = "resume.pdf";

export function getResumeFilePath(): string {
  return path.join(process.cwd(), "private", RESUME_FILENAME);
}

/** True when `private/resume.pdf` exists on the server (local or deploy machine). */
export function isResumeAvailable(): boolean {
  try {
    const filePath = getResumeFilePath();
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

export function getResumeDownloadFilename(displayName: string): string {
  const slug = displayName.trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  return slug ? `${slug}-Resume.pdf` : RESUME_FILENAME;
}

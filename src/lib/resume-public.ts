import { profile } from "@/src/data/profile";
import { RESUME_DOWNLOAD_PATH } from "@/src/lib/resume-path";

export function getExternalResumeUrl(): string | null {
  const url = profile.resumeUrl?.trim();
  return url ? url : null;
}

/** Prefer Google Drive / external URL; fall back to local `/api/resume`. */
export function getResumeDownloadHref(localFileAvailable: boolean): string | null {
  const external = getExternalResumeUrl();
  if (external) return external;
  if (localFileAvailable) return RESUME_DOWNLOAD_PATH;
  return null;
}

export function isResumeLinkAvailable(localFileAvailable: boolean): boolean {
  return getResumeDownloadHref(localFileAvailable) !== null;
}

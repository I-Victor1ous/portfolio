import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { profile } from "@/src/data/profile";
import {
  getResumeDownloadFilename,
  getResumeFilePath,
  isResumeAvailable,
} from "@/src/lib/resume.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isResumeAvailable()) {
    return new NextResponse("Resume not found.", { status: 404 });
  }

  const buffer = await readFile(getResumeFilePath());
  const filename = getResumeDownloadFilename(profile.name);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}

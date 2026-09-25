import { NextResponse } from "next/server";
import { getGithubProjects } from "@/src/lib/github";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const { error: _ignored, ...data } = await getGithubProjects();
  return NextResponse.json(
    { ...data, fetchedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}

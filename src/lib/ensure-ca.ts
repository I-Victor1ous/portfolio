import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const pemPath = join(process.cwd(), ".certs", "extra.pem");

/** Ensures `.certs/extra.pem` exists on Windows (corporate TLS / proxy). */
export function ensureWindowsCaBundle(): string | null {
  if (process.platform !== "win32") return null;

  if (!existsSync(pemPath)) {
    try {
      execSync("node scripts/sync-windows-ca.mjs", {
        cwd: process.cwd(),
        stdio: "pipe",
      });
    } catch {
      return null;
    }
  }

  return existsSync(pemPath) ? pemPath : null;
}

export function caBundlePath(): string | null {
  if (existsSync(pemPath)) return pemPath;
  return ensureWindowsCaBundle();
}

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outFile = join(process.cwd(), ".certs", "extra.pem");

if (process.platform !== "win32") {
  process.exit(0);
}

execSync(
  `powershell -NoProfile -ExecutionPolicy Bypass -File "${join(__dirname, "sync-windows-ca.ps1")}"`,
  { stdio: "inherit", cwd: process.cwd() },
);

if (!existsSync(outFile)) {
  console.error(`Expected CA bundle at ${outFile} but file was not created.`);
  process.exit(1);
}

console.log(`Ready: ${outFile}`);

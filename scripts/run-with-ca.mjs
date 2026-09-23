import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const task = process.argv[2];
if (!task) {
  console.error("Usage: node scripts/run-with-ca.mjs <dev|build|start|lint>");
  process.exit(1);
}

const env = { ...process.env };

if (process.platform === "win32") {
  spawnSync(process.execPath, ["scripts/sync-windows-ca.mjs"], {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  const pem = join(process.cwd(), ".certs", "extra.pem");
  if (existsSync(pem)) {
    env.NODE_EXTRA_CA_CERTS = resolve(pem);
  }
}

const npmScripts = {
  dev: ["next", "dev", "--turbopack"],
  build: ["next", "build"],
  start: ["next", "start"],
  lint: ["next", "lint"],
};

const args = npmScripts[task];
if (!args) {
  console.error(`Unknown task: ${task}`);
  process.exit(1);
}

const result = spawnSync("npx", args, {
  stdio: "inherit",
  env,
  shell: true,
});

process.exit(result.status ?? 1);

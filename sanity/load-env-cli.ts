import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(filename: string) {
  const envPath = resolve(process.cwd(), filename);
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

// Next.js loads `.env.local` automatically; the Sanity CLI does not.
loadEnvFile(".env.local");
loadEnvFile(".env");

function mirrorPublicEnvToStudio() {
  const mappings: [string, string][] = [
    ["NEXT_PUBLIC_SANITY_PROJECT_ID", "SANITY_STUDIO_PROJECT_ID"],
    ["NEXT_PUBLIC_SANITY_DATASET", "SANITY_STUDIO_DATASET"],
    ["NEXT_PUBLIC_SANITY_API_VERSION", "SANITY_STUDIO_API_VERSION"],
  ];

  for (const [from, to] of mappings) {
    if (process.env[from] && !process.env[to]) {
      process.env[to] = process.env[from];
    }
  }
}

mirrorPublicEnvToStudio();

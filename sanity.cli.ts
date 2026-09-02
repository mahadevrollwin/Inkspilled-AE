import "./sanity/load-env-cli";
import { defineCliConfig } from "sanity/cli";
import { apiVersion, dataset, projectId } from "./sanity/env";

if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local before running Sanity CLI commands.",
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: "inkspilled",
  vite: (viteConfig) => ({
    ...viteConfig,
    envPrefix: ["SANITY_STUDIO_", "NEXT_PUBLIC_"],
    define: {
      ...viteConfig.define,
      "process.env.SANITY_STUDIO_PROJECT_ID": JSON.stringify(projectId),
      "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID": JSON.stringify(projectId),
      "process.env.SANITY_STUDIO_DATASET": JSON.stringify(dataset),
      "process.env.NEXT_PUBLIC_SANITY_DATASET": JSON.stringify(dataset),
      "process.env.SANITY_STUDIO_API_VERSION": JSON.stringify(apiVersion),
      "process.env.NEXT_PUBLIC_SANITY_API_VERSION": JSON.stringify(apiVersion),
    },
  }),
});

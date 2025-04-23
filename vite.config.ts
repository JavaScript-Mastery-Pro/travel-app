import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "javascript-mastery",
  project: "ai-travel-dashboard",
  // An auth token is required for uploading source maps.
  authToken:
    "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",
  // ...
};

export default defineConfig((config) => {
  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths(),
      sentryReactRouter(sentryConfig, config),
    ],
    sentryConfig, // Also pass the config here!
    ssr: {
      noExternal: [/@syncfusion/],
    },
  };
});

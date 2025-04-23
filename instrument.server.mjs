import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://7dbd55117230911ccf9dd67a64fab10f@o4506813739368448.ingest.us.sentry.io/4509197028556800",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
  tracesSampleRate: 1.0, // Capture 100% of the transactions

  debug: true,
});

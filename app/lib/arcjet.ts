import arcjet, { tokenBucket, detectBot } from "@arcjet/remix";

export const aj = arcjet({
  key: import.meta.env.VITE_ARCJET_API_KEY,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  ],
});

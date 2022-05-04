import parseArgs from "https://deno.land/x/deno_minimist@v1.0.2/mod.ts";

const env = await Promise.resolve()
  .then(() => Deno.env.toObject())
  .catch(() => ({} as Record<string, string>));

const args = parseArgs(Deno.args);

const fiveDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);

export const config = {
  YEAR: args.year || fiveDaysAgo.getFullYear(),
  MONTH: args.month || fiveDaysAgo.getMonth() + 1,
  USER_EMAIL: args.e || args.email || env.FACTORIAL_USER_EMAIL || "???",
  PROJECT_FIELD_ID: parseInt(
    (
      (args.projectFieldId as number) ||
      env.PROJECT_FIELD_ID ||
      "1870833"
    ).toString()
  ),
  USER_PASSWORD:
    args.p || args.password || env.FACTORIAL_USER_PASSWORD || "???",
  SHIFT_MINUTES_RANDOMNESS:
    args.minutesRandomness || env.SHIFT_MINUTES_RANDOMNESS || 3,
  ENTRY_TIME: args.entryTime || env.ENTRY_TIME || 8,
  EXIT_TIME: args.exitTime || env.EXIT_TIME || 16,
};

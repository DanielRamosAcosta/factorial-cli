import parseArgs from "https://deno.land/x/deno_minimist@v1.0.2/mod.ts";
import { printHelp } from "./printHelp.ts";

const env = await Promise.resolve().then(() => Deno.env.toObject()).catch(
  () => ({})
);

const args: any = parseArgs(Deno.args);

if (args.help) {
  printHelp();
  Deno.exit();
}

const today = new Date();

const fiveDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);

export const config = {
  YEAR: args.year || today.getFullYear(),
  MONTH: args.month || fiveDaysAgo.getMonth() + 1,
  USER_EMAIL: args.e || args.email || env.FACTORIAL_USER_EMAIL || "???",
  USER_PASSWORD: args.p || args.password || env.FACTORIAL_USER_PASSWORD ||
    "???",
};

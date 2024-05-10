#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { config } from "../config.js";
import { MonthOfTheYear } from "../../domain/models/MonthOfTheYear.js";
import { createApp } from "./createApp.js";
import { DayRange } from "../../domain/models/DayRange.js";
import { MomentOfTheDay } from "../../domain/models/MomentOfTheDay.js";
import { Minute } from "../../domain/models/Minute.js";
import { HttpClientError } from "../http-client/HttpClientFetch.js";

const now = new Date();

const { year, month } =
  MonthOfTheYear.getNearestMonthOfTheYear(now).toPrimitives();

yargs(hideBin(process.argv))
  .command(
    "fill-shifts",
    "Fills the shifts of the given year and month",
    (yargs) =>
      yargs
        .option("year", {
          alias: "y",
          describe: "Sets the year to fill the shifts",
          type: "number",
          default: year,
        })
        .option("month", {
          alias: "m",
          describe: "Sets the month to fill the shifts",
          type: "number",
          default: month,
        })
        .option("email", {
          alias: "e",
          describe:
            "The email of your factorial account. Also configurable via FACTORIAL_USER_EMAIL env variable.",
          type: "string",
        })
        .option("password", {
          alias: "p",
          describe:
            "The password of your factorial account. Also configurable via FACTORIAL_USER_PASSWORD env variable",
          type: "string",
        })
        .option("randomness", {
          alias: "r",
          describe: "Randomness in minutes to add before and after the shift",
          default: 10,
          type: "number",
        })
        .option("project", {
          alias: "o",
          describe: "The project to assign to every shift",
          type: "string",
        })
        .option("entryHour", {
          describe: "The entry hour to set to all the shifts",
          type: "number",
          default: 8,
        })
        .option("exitHour", {
          describe:
            "The exit hour to set to all the shifts. Default is entryHour + 8",
          type: "number",
        }),
    async ({
      year,
      month,
      email = config.email,
      password = config.password,
      randomness,
      project: projectName,
      entryHour,
      exitHour,
    }) => {
      const { fillShifts } = await createApp(email, password);

      const start = MomentOfTheDay.oClock(entryHour);
      const end = MomentOfTheDay.oClock(exitHour ?? entryHour + 8);
      const dayRange = DayRange.from(start).to(end);
      await fillShifts.execute({
        monthOfTheYear: MonthOfTheYear.at(year, month),
        projectName,
        dayRange,
        maxRandomMinute: new Minute(randomness),
      });
    },
  )
  .demandCommand(1)
  .fail((msg, err) => {
    if (err) {
      if (err instanceof HttpClientError) {
        const data = err.response.data;
        console.error(JSON.stringify(data, null, 2));
        process.exit(1);
      }

      throw err;
    }
    console.error(msg);
    console.error(err);
    process.exit(1);
  })
  .parse();

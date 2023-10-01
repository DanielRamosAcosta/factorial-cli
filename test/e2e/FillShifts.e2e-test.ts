import { beforeEach, describe, it } from "vitest";
import { App, createApp } from "../../src/infrastructure/cli/createApp.js";
import { config } from "../../src/infrastructure/config.js";
import { MonthOfTheYear } from "../../src/domain/models/MonthOfTheYear.js";
import { DayRange } from "../../src/domain/models/DayRange.js";
import { MomentOfTheDay } from "../../src/domain/models/MomentOfTheDay.js";
import { Minute } from "../../src/domain/models/Minute.js";

describe("FillShifts", () => {
  let app: App;

  beforeEach(async () => {
    app = await createApp(config.email, config.password);
  });

  it("saves the shifts", async () => {
    const start = MomentOfTheDay.oClock(8);
    const end = MomentOfTheDay.oClock(16);
    const dayRange = DayRange.from(start).to(end);

    await app.fillShifts.execute({
      monthOfTheYear: MonthOfTheYear.at(2024, 1),
      projectName: "My project",
      dayRange,
      maxRandomMinute: new Minute(10),
    });
  });
});

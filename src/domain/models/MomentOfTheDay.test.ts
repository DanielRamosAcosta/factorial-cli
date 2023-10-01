import { describe, it, expect } from "vitest";
import { MomentOfTheDay } from "./MomentOfTheDay.js";
import { Minute } from "./Minute.js";

describe("MomentOfTheDay", () => {
  describe("add", () => {
    it("adds the given minute", () => {
      const moment = MomentOfTheDay.at(10, 0);

      const otherMoment = moment.add(new Minute(10));

      expect(otherMoment).toEqual(MomentOfTheDay.at(10, 10));
    });

    it("adds an hour if overflows", () => {
      const moment = MomentOfTheDay.at(10, 0);

      const otherMoment = moment.add(new Minute(60));

      expect(otherMoment).toEqual(MomentOfTheDay.at(11, 0));
    });

    it("subtracts an hour if minutes are negative", () => {
      const moment = MomentOfTheDay.at(10, 0);

      const otherMoment = moment.add(new Minute(-1));

      expect(otherMoment).toEqual(MomentOfTheDay.at(9, 59));
    });
  });
});

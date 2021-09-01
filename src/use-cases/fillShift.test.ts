import { FactorialHttpClientFake } from "../../test/createFactorialApiFake.ts";
import { CookieParserServiceImpl } from "../factorial/api/services/CookieParserServiceImpl.ts";
import { QueryStringServiceImpl } from "../factorial/api/services/QueryStringServiceImpl.ts";
import { createFactorialApiClient } from "../factorial/createFactorialApiClient.ts";
import { createFactorialUtils } from "../factorial/createFactorialUtils.ts";
import { createFillShifts } from "./fillShift.ts";

Deno.test("foo", async () => {
  const factorial = createFactorialApiClient(
    new FactorialHttpClientFake(),
    CookieParserServiceImpl.create(),
    QueryStringServiceImpl.create()
  );

  const fillShifts = createFillShifts(factorial, createFactorialUtils());

  await fillShifts("danielramos@example.com", "password", 2021, 8, 0, 8, 10);
});

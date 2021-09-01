import { CookieParserServiceImpl } from "./CookieParserServiceImpl.ts";
import { assertEquals } from "../../../../dev_deps.ts";

Deno.test("cookie parser service works", () => {
  const cookieParserService = CookieParserServiceImpl.create();

  const exampleCookie =
    "_factorial_session_v2=28036185edd4f81edb741a5b1e743804; domain=api.factorialhr.com; path=/; expires=Thu, 21 Jan 2021 20:14:25 GMT; secure; HttpOnly; SameSite=Lax";

  const parsed = cookieParserService.parse(exampleCookie);

  assertEquals(parsed, {
    _factorial_session_v2: "28036185edd4f81edb741a5b1e743804",
    domain: "api.factorialhr.com",
    path: "/",
    expires: "Thu, 21 Jan 2021 20:14:25 GMT",
    secure: "",
    HttpOnly: "",
    SameSite: "Lax",
  });
});

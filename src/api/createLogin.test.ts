import { assertEquals } from "../../dev_deps.ts";
import { createLogin } from "./createLogin.ts";
import { HttpClientFetch } from "./HttpClientFetch.ts";
import { QueryStringServiceImpl } from "./services/QueryStringServiceImpl.ts";
import { CookieParserServiceImpl } from "./services/CookieParserServiceImpl.ts";

Deno.test({
  name: "login works",
  ignore: true,
  fn: async () => {
    const client = HttpClientFetch.create(
      { baseURL: "https://api.factorialhr.com" },
    );
    const queryStringService = QueryStringServiceImpl.create();
    const cookieParserService = CookieParserServiceImpl.create();

    const login = createLogin(client, cookieParserService, queryStringService);

    const { cookie } = await login({
      email: "danielramos@example.com",
      password: "????",
    });

    assertEquals(cookie.length, 32);
  },
});

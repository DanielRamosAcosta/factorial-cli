import { assertEquals } from "../../../../dev_deps.ts";
import { QueryStringServiceImpl } from "./QueryStringServiceImpl.ts";

Deno.test("query string service works", () => {
  const queryStringService = QueryStringServiceImpl.create();

  const data = {
    authenticity_token:
      "71UnnNZGvsBb2KgOFc+L1mAppF9aHeA00bcw2Xmhnusmf7Kvv0VGh1JsM2QRnLvFkcUtCcHVKfhpe5DFW2zF7w==",
    return_host: "factorialhr.es",
    "user[email]": "danielramos@example.com",
    "user[password]": "password",
    "user[remember_me]": "0",
    commit: "Iniciar+sesión",
  };

  const result = queryStringService.stringify(data);

  assertEquals(
    result,
    "authenticity_token=71UnnNZGvsBb2KgOFc%2BL1mAppF9aHeA00bcw2Xmhnusmf7Kvv0VGh1JsM2QRnLvFkcUtCcHVKfhpe5DFW2zF7w%3D%3D&return_host=factorialhr.es&user%5Bemail%5D=danielramos%40example.com&user%5Bpassword%5D=password&user%5Bremember_me%5D=0&commit=Iniciar%2Bsesi%C3%B3n"
  );
});

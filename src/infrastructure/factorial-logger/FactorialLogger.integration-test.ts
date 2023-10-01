import { describe, expect, it } from "vitest";
import { FactorialLogger } from "./FactorialLogger.js";
import { HttpClientFetch } from "../http-client/HttpClientFetch.js";
import { config } from "../config.js";

describe("FactorialLogger", () => {
  it("returns the session cookie", async () => {
    const logger = new FactorialLogger(HttpClientFetch.create());

    const cookie = await logger.login({
      email: config.email,
      password: config.password,
    });

    expect(cookie).toMatch(/^[0-9a-f]+$/);
    expect(cookie).toHaveLength(32);
  });

  it("throws an error if password is invalid", async () => {
    const logger = new FactorialLogger(HttpClientFetch.create());

    const result = logger.login({
      email: "some@one.com",
      password: "invalidPassword",
    });

    expect(result).rejects.toThrowError("Invalid email or password");
  });
});

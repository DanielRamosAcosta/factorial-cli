import { CookieParserService } from "./CookieParserService.ts";

export class CookieParserServiceImpl implements CookieParserService {
  static create() {
    return new CookieParserServiceImpl();
  }

  parse(cookies: string): Record<string, string> {
    return Object.fromEntries(
      cookies
        .split("; ")
        .map((row) => row.includes("=") ? row.split("=") : [row, ""]),
    );
  }
}

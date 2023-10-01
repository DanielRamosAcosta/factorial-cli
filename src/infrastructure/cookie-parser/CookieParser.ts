export class CookieParser {
  static create() {
    return new CookieParser();
  }

  parse(cookies: string): Record<string, string> {
    return Object.fromEntries(
      cookies
        .split("; ")
        .map((row) => (row.includes("=") ? row.split("=") : [row, ""])),
    );
  }
}

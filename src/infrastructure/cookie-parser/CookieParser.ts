export class CookieParser {
  static create() {
    return new CookieParser();
  }

  parse(cookies: string | string[]): Record<string, string> {
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];

    return Object.fromEntries(
      cookieArray.map((cookie) => {
        const [nameValue] = cookie.split("; ");
        const [name, ...valueParts] = nameValue.split("=");
        return [name, valueParts.join("=")];
      }),
    );
  }
}

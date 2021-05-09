export interface CookieParserService {
  parse(cookies: string): Record<string, string>;
}

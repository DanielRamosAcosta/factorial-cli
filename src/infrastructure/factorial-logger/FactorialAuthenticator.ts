import { HttpClient, HttpResponse } from "../http-client/HttpClient.js";
import { HttpClientError } from "../http-client/HttpClientFetch.js";
import { CookieParser } from "../cookie-parser/CookieParser.js";

type Credentials = {
  email: string;
  password: string;
};

const SESSION_COOKIE_NAME = "_factorial_id";

export class FactorialAuthenticator {
  private static LOGIN_URL =
    "https://id.factorialhr.com/api/auth/challenges/first_factor";

  public static authenticatedHeadersWith(cookie: string) {
    return {
      cookie: `${SESSION_COOKIE_NAME}=${cookie};`,
    };
  }

  private cookieParser = new CookieParser();

  constructor(private readonly http: HttpClient) {}

  /**
   * Logins into factorial account
   * @returns cookie the session cookie to authenticate FactorialClient requests
   */
  public async login({ email, password }: Credentials): Promise<string> {
    if (!email) {
      throw new Error("Email must be provided");
    }
    if (!password) {
      throw new Error("Password must be provided");
    }

    let response: HttpResponse<{ success: boolean }>;
    try {
      response = await this.http.post(
        FactorialAuthenticator.LOGIN_URL,
        { email, password },
        { headers: { accept: "application/json" } },
      );
    } catch (error) {
      if (this.isInvalidCredentialsError(error)) {
        throw new Error("Invalid email or password");
      }
      throw error;
    }

    if (!response.data.success) {
      throw new Error("Invalid email or password");
    }

    return this.getSessionCookieFrom(response);
  }

  private isInvalidCredentialsError(error: unknown): boolean {
    if (!(error instanceof HttpClientError)) return false;
    const body = error.response.data as
      | { error?: { code?: string } }
      | string
      | undefined;
    if (typeof body === "object" && body?.error?.code === "invalid_credentials") {
      return true;
    }
    return false;
  }

  private getSessionCookieFrom(response: HttpResponse) {
    const setCookie = response.headers["set-cookie"];
    if (!setCookie) {
      throw new Error("Could not find cookies in response");
    }
    const cookies = this.cookieParser.parse(setCookie);
    const session = cookies[SESSION_COOKIE_NAME];
    if (!session) {
      throw new Error(`Could not find cookie ${SESSION_COOKIE_NAME}`);
    }
    return session;
  }
}

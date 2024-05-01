import { HttpClient, HttpResponse } from "../http-client/HttpClient.js";
import { CookieParser } from "../cookie-parser/CookieParser.js";

type Credentials = {
  email: string;
  password: string;
};

export class FactorialAuthenticator {
  private static LOGIN_URL = "https://api.factorialhr.com/es/users/sign_in";

  public static authenticatedHeadersWith(cookie: string) {
    return {
      cookie: `_factorial_session_v2=${cookie};`,
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

    const response = await this.http.get<string>(
      FactorialAuthenticator.LOGIN_URL,
    );
    const session = this.getSessionCookieFrom(response);
    const authenticityToken = this.getAuthenticityTokenFrom(response);

    const params = new URLSearchParams({
      authenticity_token: authenticityToken,
      "user[email]": email,
      "user[password]": password,
    });

    const authenticatedResponse = await this.http.post(
      FactorialAuthenticator.LOGIN_URL,
      params.toString(),
      {
        headers: FactorialAuthenticator.authenticatedHeadersWith(session),
        maxRedirects: 0,
      },
    );

    this.ensureIsOk(authenticatedResponse);

    return this.getSessionCookieFrom(authenticatedResponse);
  }

  private ensureIsOk(authenticatedResponse: HttpResponse) {
    if (authenticatedResponse.data.includes(FactorialAuthenticator.LOGIN_URL)) {
      throw new Error("Invalid email or password");
    }
  }

  private getSessionCookieFrom(response: HttpResponse<string>) {
    const cookies = this.extractCookies(response);
    return this.getFactorialSessionCookie(cookies);
  }

  private getFactorialSessionCookie(cookies: Record<string, string>) {
    const factorialSession = cookies["_factorial_session_v2"];

    if (!factorialSession) {
      throw new Error("Could not find cookie factorial_session_v2");
    }

    return factorialSession;
  }

  private extractCookies(response: HttpResponse<string>) {
    const SET_COOKIE_PATH = "set-cookie";

    const cookies = response.headers[SET_COOKIE_PATH];

    if (!cookies) {
      throw new Error("Could not find cookies in response");
    }

    return this.cookieParser.parse(cookies);
  }

  private getAuthenticityTokenFrom(response: HttpResponse<string>) {
    const matches = response.data.match(
      new RegExp(`name="authenticity_token" value="(.+?)"`),
    );

    if (!matches) {
      throw new Error("Could not find authenticity_token token in login form");
    }

    return matches[1];
  }
}

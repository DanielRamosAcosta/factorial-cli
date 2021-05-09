import { HttpClient, HttpResponse } from "./HttpClient.ts";
import { CookieParserService } from "./services/CookieParserService.ts";
import { QueryStringService } from "./services/QueryStringService.ts";

export type LoginRequest = {
  email: string;
  password: string;
};

export const createLogin = (
  client: HttpClient,
  cookieParser: CookieParserService,
  qs: QueryStringService,
) =>
  async (loginRequest: LoginRequest) => {
    const getFactorialCookie = (response: HttpResponse<string>) => {
      const SET_COOKIE_PATH = "set-cookie";
      const FACTORIAL_SESSION_V2_PATH = "_factorial_session_v2";

      const cookie = response.headers[SET_COOKIE_PATH];

      if (!cookie) {
        throw new Error("Could not find cookie factorial_session_v2");
      }

      const parsedCookie = cookieParser.parse(cookie);
      const factorialSession = parsedCookie[FACTORIAL_SESSION_V2_PATH];

      if (!factorialSession) {
        throw new Error("Could not find cookie factorial_session_v2");
      }

      return factorialSession;
    };

    const getAuthenticityToken = (response: HttpResponse<string>) => {
      const matches = response.data.match(
        new RegExp(`name="authenticity_token" value="(.+?)"`),
      );

      if (!matches) {
        throw new Error(
          "Could not find authenticity_token token in login form",
        );
      }

      return matches[1];
    };

    const { authenticityToken, factorialSession } = await client
      .get<string>("/es/users/sign_in")
      .then((response) => {
        const factorialSession = getFactorialCookie(response);
        const authenticityToken = getAuthenticityToken(response);

        return {
          factorialSession,
          authenticityToken,
        };
      });

    const data = qs.stringify({
      authenticity_token: authenticityToken,
      return_host: "factorialhr.es",
      "user[email]": loginRequest.email,
      "user[password]": loginRequest.password,
      "user[remember_me]": "0",
      commit: "Iniciar+sesión",
    });

    const response = await client
      .post("/es/users/sign_in", data, {
        headers: {
          cookie: `_factorial_session_v2=${factorialSession};`,
        },
        maxRedirects: 0,
      })
      .catch((error) => {
        if (error.response && error.response.status === 302) {
          return error.response as HttpResponse;
        }
        throw error;
      });

    if (response.status !== 302) {
      throw new Error(`Login failed`);
    }

    return { cookie: getFactorialCookie(response) };
  };

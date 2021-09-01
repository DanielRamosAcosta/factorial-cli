// deno-lint-ignore-file
import {
  HttpClient,
  HttpClientOptions,
  HttpResponse,
  RequestOptions,
} from "../src/factorial/api/HttpClient.ts";

export class FactorialHttpClientFake implements HttpClient {
  updateConfig(options: HttpClientOptions) {}

  async get<T = any>(
    url: string,
    options?: RequestOptions
  ): Promise<HttpResponse<T>> {
    if (url === "/es/users/sign_in") {
      return {
        data: `name="authenticity_token" value="abcdefghijklmnopq"` as any,
        headers: {
          "set-cookie":
            "_factorial_session_v2=28036185edd4f81edb741a5b1e743804; domain=api.factorialhr.com; path=/; expires=Thu, 21 Jan 2021 20:14:25 GMT; secure; HttpOnly; SameSite=Lax",
        },
        status: 200,
      };
    }

    throw new Error(`[get] no mock for ${url}`);

    return {
      data: {} as T,
      headers: {},
      status: 200,
    };
  }

  async post<T = any>(
    url: string,
    body: any,
    options?: RequestOptions
  ): Promise<HttpResponse<T>> {
    if (url === "/es/users/sign_in") {
      return {
        data: {} as T,
        headers: {
          "set-cookie":
            "_factorial_session_v2=28036185edd4f81edb741a5b1e743804; domain=api.factorialhr.com; path=/; expires=Thu, 21 Jan 2021 20:14:25 GMT; secure; HttpOnly; SameSite=Lax",
        },
        status: 302,
      };
    }

    throw new Error(`[post] no mock for ${url}`);

    return {
      data: {} as T,
      headers: {},
      status: 201,
    };
  }

  async delete<T = any>(url: string): Promise<HttpResponse<T>> {
    throw new Error(`no mock for ${url}`);

    return {
      data: {} as T,
      headers: {},
      status: 200,
    };
  }
}

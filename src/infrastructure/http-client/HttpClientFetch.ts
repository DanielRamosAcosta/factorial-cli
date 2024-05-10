import { HttpClient, HttpResponse, RequestOptions } from "./HttpClient.js";

type HttpClientOptions = {
  baseURL?: string;
  headers?: Record<string, string>;
};

type PrivateHttpClientOptions = {
  baseURL: string;
  headers: Record<string, string>;
};

export class HttpClientError<T> extends Error {
  constructor(public response: HttpResponse<T>) {
    super(`Request failed with status code ${response.status}`);
  }
}

export class HttpClientFetch implements HttpClient {
  static create(options: HttpClientOptions = {}) {
    return new HttpClientFetch({
      baseURL: "",
      headers: {},
      ...options,
    });
  }

  constructor(private options: PrivateHttpClientOptions) {}

  async get<T = any>(
    path: string,
    options?: RequestOptions,
  ): Promise<HttpResponse<T>> {
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        ...this.options.headers,
        ...options?.headers,
      },
    };

    let url = this.options.baseURL + path;

    if (options?.params) {
      const params = new URLSearchParams();

      Object.entries(options.params).forEach(([key, value]) => {
        params.append(key, value.toString());
      });

      url += `?${params.toString()}`;
    }

    const response = await fetch(url, fetchOptions);

    const headers: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const data: T = headers["content-type"].includes("json")
      ? await response.json()
      : await response.text();

    if (response.status >= 400) {
      throw new HttpClientError({
        data,
        headers,
        status: response.status,
      });
    }

    return {
      data,
      headers,
      status: response.status,
    };
  }

  async post<T = any>(
    url: string,
    body: any,
    options?: RequestOptions,
  ): Promise<HttpResponse<T>> {
    const fetchOptions: RequestInit = {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
      headers: {
        ...this.options.headers,
        ...options?.headers,
        ...(typeof body === "string"
          ? { "content-type": "application/x-www-form-urlencoded" }
          : { "content-type": "application/json" }),
      },
      ...(options?.maxRedirects === 0 ? { redirect: "manual" } : {}),
    };

    const response = await fetch(this.options.baseURL + url, fetchOptions);

    const headers: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const data: T = headers["content-type"].includes("json")
      ? await response.json()
      : await response.text();

    if (response.status >= 400) {
      throw new HttpClientError({
        data,
        headers,
        status: response.status,
      });
    }

    return {
      data,
      headers,
      status: response.status,
    };
  }

  async delete<T = any>(url: string): Promise<HttpResponse<T>> {
    const fetchOptions: RequestInit = {
      method: "DELETE",
      headers: {
        ...this.options.headers,
      },
    };

    const response = await fetch(this.options.baseURL + url, fetchOptions);

    const headers: Record<string, string> = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const contentType = headers["content-type"] || "";
    const data: T = contentType.includes("json")
      ? await response.json()
      : await response.text();

    if (response.status >= 400) {
      throw new HttpClientError({
        data,
        headers,
        status: response.status,
      });
    }

    return {
      data,
      headers,
      status: response.status,
    };
  }
}

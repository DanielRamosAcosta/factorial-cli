export interface HttpResponse<T = any> {
  data: T;
  headers: Record<string, string>;
  status: number;
}

export interface RequestOptions {
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
  maxRedirects?: number;
}

export type HttpClientOptions = {
  baseURL?: string;
  headers?: Record<string, string>;
};

export interface HttpClient {
  get<T = any>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>;
  post<T = any>(
    url: string,
    data: any,
    options?: RequestOptions
  ): Promise<HttpResponse<T>>;
  delete<T = any>(url: string): Promise<HttpResponse<T>>;
  updateConfig(options: HttpClientOptions): void;
}

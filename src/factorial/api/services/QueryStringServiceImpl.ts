import { QueryStringService } from "./QueryStringService.ts";

export class QueryStringServiceImpl implements QueryStringService {
  static create() {
    return new QueryStringServiceImpl();
  }

  stringify(data: Record<string, string>): string {
    const searchParams = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    return searchParams.toString();
  }
}

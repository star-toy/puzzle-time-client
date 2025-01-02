import { auth } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dev-puzzletime.com/api';

interface IRequestInit extends RequestInit {
  params?: Record<string, string>;
}

class HttpClient {
  private baseUrl: string;

  private headers: Headers;

  private token: string | undefined;

  constructor(baseUrl: string, token: string | undefined) {
    this.baseUrl = baseUrl;
    this.token = token;

    this.headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      this.headers.set('Authorization', `${this.token}`);
      this.headers.set('Cookie', `token=${this.token}`);
    }
  }

  private async fetch<T>(path: string, init?: IRequestInit): Promise<T> {
    const { params, ...restInit } = init || {};

    let url = `${this.baseUrl}${path}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...restInit,
      headers: this.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  get<T>(path: string, init?: IRequestInit): Promise<T> {
    return this.fetch<T>(path, { ...init, method: 'GET' });
  }

  post<T>(path: string, body: unknown, init?: IRequestInit): Promise<T> {
    return this.fetch<T>(path, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export async function createHttpClient() {
  const session = await auth();
  const token: string | undefined = session?.accessToken;

  return new HttpClient(API_BASE_URL, token);
}

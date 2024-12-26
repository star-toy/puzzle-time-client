import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dev-puzzletime.com/api';

interface IRequestInit extends RequestInit {
  params?: Record<string, string>;
}

class HttpClient {
  private baseUrl: string;

  private headers: Headers;

  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;

    this.headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      this.headers.set('Authorization', `token ${this.token}`);
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

const TEST_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoeWVvbmFraW0wMTI5QGdtYWlsLmNvbSIsIm5hbWUiOiJUZXN0IFVzZXIiLCJpYXQiOjE3MzUxOTc2NzYsImV4cCI6MTczNTI4NDA3Nn0.xusV5kaBncVB0xJAWLLjM6ygzH621wnjmFv5RrZdmtz_WGHlXDwGhCFg1bBbZUbakvz3WEimJyNC7ch371D0JQ';

export async function createHttpClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  return new HttpClient(API_BASE_URL, token || TEST_TOKEN);
}

import type { Session } from 'next-auth';

import { auth } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

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
      const errorData: { message?: string } = await response.json().catch(() => ({}));
      console.log(errorData);
      throw new Error(errorData.message || 'API request failed', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        },
      });
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
  const session = (await auth()) as (Session & { accessToken: string; refreshToken: string }) | null;
  const token: string | undefined = session?.accessToken;

  return new HttpClient(API_BASE_URL, token);
}

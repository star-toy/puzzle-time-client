import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';

import { isTokenExpired } from '@/app/_utils/jwt';
import { URLS } from '@/app/constants';
import { auth, unstable_update } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

interface IRequestInit extends RequestInit {
  params?: Record<string, string>;
}

export class HttpClient {
  private baseUrl: string;

  private headers: Headers;

  private token: string | undefined | null;

  constructor(baseUrl: string, token: string | undefined | null) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.handleExpiredToken = this.handleExpiredToken.bind(this);

    this.headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      if (!isTokenExpired(this.token)) {
        this.headers.set('Authorization', `${this.token}`);
        this.headers.set('Cookie', `token=${this.token}`);
      } else {
        this.handleExpiredToken();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private handleExpiredToken() {
    this.headers.delete('Authorization');
    this.headers.delete('Cookie');
  }

  private async fetch<T>(path: string, init?: IRequestInit): Promise<T> {
    if (this.token && isTokenExpired(this.token)) {
      this.handleExpiredToken();
    }

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
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const token: string | undefined | null = session?.accessToken;

  return new HttpClient(API_BASE_URL, token);
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dev-puzzletime.com/api';

interface IRequestInit extends RequestInit {
  params?: Record<string, string>;
}

export class AuthClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.json();
  }
}

export function createAuthClient() {
  return new AuthClient(API_BASE_URL);
}

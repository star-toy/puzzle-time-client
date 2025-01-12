import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function refreshTokenApi(refreshToken: string): Promise<IAuthToken> {
  const response = await fetch(`${API_URL}${URLS.refreshTokenServer()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${refreshToken}`,
    },
  });

  if (!response.ok) {
    const data: { code: string } = await response.json();
    console.error('Refresh token failed:', data);
    throw new Error('Failed to refresh token');
  }

  const token = (await response.json()) as IAuthToken;
  return token;
}

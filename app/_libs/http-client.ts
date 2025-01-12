import type { Session } from 'next-auth';

import { auth } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const newOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: session?.accessToken ? session.accessToken : '',
      Cookie: session?.accessToken ? `token=${session.accessToken}` : '',
    },
  };

  const response = await fetch(`${API_URL}${url}`, newOptions);

  const isAuthApi = url.startsWith('/api/auth/') || url.startsWith('/api/login');

  if (response.status === 401 && !isAuthApi) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    } else {
      console.error('Unauthorized!');
    }

    throw new Error('Unauthorized');
  }

  return response;
}

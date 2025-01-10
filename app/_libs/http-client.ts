import type { Session } from 'next-auth';

import { URLS } from '../constants';

import { auth, signOut } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.puzzletime.fun/api';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;

  const newOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
      Cookie: session?.accessToken ? `token=${session.accessToken}` : '',
    },
  };

  const response = await fetch(`${API_URL}${url}`, newOptions);

  // Exclude authentication-related API routes from redirect logic
  const isAuthApi = url.startsWith('/api/auth/') || url.startsWith('/api/login');

  if (response.status === 401 && !isAuthApi) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      console.error('Unauthorized!');
    }

    throw new Error('Unauthorized');
  }

  return response;
}

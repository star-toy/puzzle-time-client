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
    },
  };

  const response = await fetch(`${API_URL}${url}`, newOptions);

  // Exclude authentication-related API routes from redirect logic
  const isAuthApi = url.startsWith('/api/auth/') || url.startsWith('/api/login');

  if (response.status === 401 && !isAuthApi) {
    // Redirect to login page on client-side
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      // On server-side, you might want to handle redirection differently
      // For example, throw an error or use a server-side redirection method
      console.error('Unauthorized! Redirecting to login.');
    }

    // Clear tokens by signing out
    await signOut({ redirect: false });

    // Optionally, throw an error to stop further execution
    throw new Error('Unauthorized');
  }

  return response;
}

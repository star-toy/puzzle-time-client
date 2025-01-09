'use server';

import { signIn } from '@/auth';

export async function loginAction() {
  await signIn('google', {
    callbackUrl: `/api/auth/callback/google`,
  });
}

'use server';

import { signIn } from '@/auth';

export async function loginAction() {
  await signIn('google', {
    //   callbackUrl: `${window.location.protocol}//${window.location.hostname}/api/auth/callback/google`,
    callbackUrl: `/api/auth/callback/google`,
  });
}

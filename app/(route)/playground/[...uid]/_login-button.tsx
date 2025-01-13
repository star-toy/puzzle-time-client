import { useSession } from 'next-auth/react';

import { signIn } from '@/auth';

async function loginAction() {
  await signIn('google', {
    //   callbackUrl: `${window.location.protocol}//${window.location.hostname}/api/auth/callback/google`,
    callbackUrl: `/api/auth/callback/google`,
  });
}

interface ILoginButtonProps {
  className?: string;
}

export function LoginButton({ className }: ILoginButtonProps) {
  const { data: session } = useSession();

  return (
    <button type="button" onClick={() => loginAction()} className={className}>
      {session?.user ? `Hello, ${session.user.name}` : 'LOGIN'}
    </button>
  );
}

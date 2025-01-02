import { useSession } from 'next-auth/react';

import { loginAction } from './_login-action';

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

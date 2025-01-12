'use client';

import { loginAction } from './_login-action';

interface ILoginButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function LoginButton({ className, children }: ILoginButtonProps) {
  return (
    <button type="button" onClick={() => loginAction()} className={className}>
      {children}
    </button>
  );
}

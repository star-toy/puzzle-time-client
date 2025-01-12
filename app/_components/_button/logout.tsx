'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { URLS } from '@/app/constants';

interface ILogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function LogoutButton({ children, className }: ILogoutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(URLS.getMainPage());
  };

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      {!!children && children}
      {!children && <Image src="/assets/mypage/christmas/button-logout.png" alt="back" width={150} height={210} />}
    </button>
  );
}

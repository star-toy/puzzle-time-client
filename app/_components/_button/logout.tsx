'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { URLS } from '@/app/constants';

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(URLS.getMainPage());
  };

  return (
    <button type="button" onClick={handleSignOut}>
      <Image src="/assets/mypage/christmas/button-logout.png" alt="back" width={150} height={210} />
    </button>
  );
}

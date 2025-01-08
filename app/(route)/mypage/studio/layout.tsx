import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';

import LogoutButton from '@/app/_components/_button/logout';
import { URLS } from '@/app/constants';
import { auth, signOut } from '@/auth';

export default async function MypageLayout({ children }: { children: React.ReactNode }) {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const handleSignOut = async () => {
    if (!session) return;
    session.accessToken = null;
    session.refreshToken = null;
    await signOut();
    redirect(URLS.getMainPage());
  };

  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('/assets/mypage/christmas/bg-bricks.png')] bg-no-repeat bg-center bg-cover">
      <div className="absolute top-0 left-0 w-full z-10 flex items-start justify-between px-[203px]">
        <Link href={URLS.getMainPage()}>
          <Image src="/assets/mypage/christmas/button-home.png" alt="back" width={150} height={210} />
        </Link>
        <LogoutButton />
      </div>

      <div className="absolute bottom-[14px] left-0 w-full z-10">{children}</div>
    </div>
  );
}

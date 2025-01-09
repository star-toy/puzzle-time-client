// 'use client';

import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

import LogoutButton from './_components/_button/logout';
import LoginButton from './_components/_ui/auth/login-button';

import Snowy from '@/app/_components/_ui/main/christmas/snowy';
import { isTokenExpired } from '@/app/_utils/jwt';
import { SCREEN_WIDTH, URLS } from '@/app/constants';
import { auth, authOptions } from '@/auth';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  const isExpired = isTokenExpired(session?.accessToken);

  return (
    <div className="w-full h-screen">
      <div className="relative w-full h-full bg-[url('/assets/mainpage/christmas/background.png')] bg-cover bg-center">
        <Snowy count={200} className="absolute z-50 top-0 left-0 w-full h-full" />
        <Image
          src="/assets/mainpage/christmas/ceilling-deco.png"
          alt=""
          width={SCREEN_WIDTH}
          height={120}
          className="absolute z-[60] top-0 left-0 w-auto h-auto bg-cover bg-center"
        />
        <Image
          src="/assets/mainpage/christmas/ceilling-lights.png"
          alt=""
          width={SCREEN_WIDTH}
          height={20}
          className="absolute z-[70] top-0 left-0 w-auto h-auto bg-cover bg-center"
        />
        <div className="absolute z-[80] top-0 left-0 w-full h-full flex flex-col space-y-4 items-center justify-center">
          {isExpired && (<LoginButton className="bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] rounded-[5px] py-[10px] px-[30px]">
            <span className="text-[30px]">Sign in with Google</span>
          </LoginButton>)}

          {!isExpired && (<Link href={URLS.getMainPage()} className="bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] rounded-[5px] py-[10px] px-[30px]">
            <span className="text-[30px]">Let&apos;s play PuzzleTime!</span>
          </Link>)}
          {!isExpired && (<LogoutButton className="bg-[#A65043] border-2 border-[#4D1818] text-[#F3E5CE] rounded-[5px] py-[10px] px-[30px]">
            <span className="text-[30px]">Logout</span>
          </LogoutButton>)}
        </div>
      </div>
    </div>
  );
}

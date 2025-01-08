import type { Session } from 'next-auth';

import PlaygroundNav from './_nav';

import { auth, signOut } from '@/auth';

export default async function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  const session = (await auth()) as (Session & { accessToken: string; refreshToken: string }) | null;

  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('/assets/playground/christmas/background.png')] bg-no-repeat bg-center bg-cover">
      <PlaygroundNav isLogin={!!session?.accessToken} />

      <div className="w-full h-full">{children}</div>
    </div>
  );
}

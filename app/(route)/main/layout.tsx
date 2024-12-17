import type React from 'react';

import Image from 'next/image';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-[url('/assets/mainpage/christmas/christmas-bg-frame.png')] bg-cover bg-center">
      <div>
        <Image
          src="/assets/mainpage/christmas/ceilling-deco.png"
          alt=""
          width={1920}
          height={120}
          className="absolute top-0 left-0"
        />
        Puzzle Time (feat. PuddingCamp)
        {children}
      </div>
    </div>
  );
}

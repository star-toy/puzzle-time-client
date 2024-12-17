import type React from 'react';
import Image from 'next/image';

import Snowy from '@/app/_components/_ui/main/christmas/snowy';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[url('/assets/mainpage/christmas/background.png')] bg-cover bg-center">
      <Snowy count={400} />
      <Image
        src="/assets/mainpage/christmas/christmas-bg-frame.png"
        alt=""
        width={1920}
        height={1080}
        className="absolute z-50 top-0 left-0 w-auto h-auto bg-cover bg-center"
      />
      <Image
        src="/assets/mainpage/christmas/ceilling-deco.png"
        alt=""
        width={1920}
        height={120}
        className="absolute z-[60] top-0 left-0 w-auto h-auto bg-cover bg-center"
      />
      <Image
        src="/assets/mainpage/christmas/ceilling-lights.png"
        alt=""
        width={1920}
        height={20}
        className="absolute z-[70] top-0 left-0 w-auto h-auto bg-cover bg-center"
      />
      <div className="w-full h-full pt-[162px] px-[130px] pb-[35px]">{children}</div>
    </div>
  );
}

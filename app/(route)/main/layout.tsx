import type React from 'react';
import Image from 'next/image';

import Snowy from '@/app/_components/_ui/main/christmas/snowy';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/app/constants';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[url('/assets/mainpage/christmas/background.png')] bg-cover bg-center">
      <Snowy count={200} className="absolute z-50 top-0 left-0 w-full h-full" />
      <Image
        src="/assets/mainpage/christmas/christmas-bg-frame.png"
        alt=""
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        className="absolute z-50 top-0 left-0 w-auto h-auto bg-cover bg-center"
      />
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
      <div className="w-full h-full pt-[162px] px-[130px] pb-[35px]">{children}</div>
    </div>
  );
}

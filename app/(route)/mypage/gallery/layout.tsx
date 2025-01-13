import Image from 'next/image';
import Link from 'next/link';

import LogoutButton from '@/app/_components/_button/logout';
import { URLS } from '@/app/constants';

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/mypage/christmas/bg-bricks.png')] bg-no-repeat bg-center bg-cover">
      <div className="absolute top-0 left-0 w-full z-10 flex items-start justify-between px-[203px]">
        <Link href={URLS.getMainPage()}>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/mypage/christmas/button-home.png" alt="back" width={150} height={210} />
        </Link>
        <LogoutButton />
      </div>

      {children}
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

import { loginAction } from '@/app/(route)/playground/[...uid]/_login-action';
import { URLS } from '@/app/constants';

interface IButtonEnterProps {
  className?: string;
  isLogin: boolean;
}

export default function ButtonEnter({ isLogin, className }: IButtonEnterProps) {
  return (
    <>
      {isLogin && (
        <Link href={URLS.getMypagePageByKind('studio')} className={className}>
          <Image src="/assets/mainpage/christmas/button-enter.png" alt="게임 입장" width={500} height={90} />
        </Link>
      )}
      {!isLogin && (
        <div className={className} onClick={loginAction}>
          <Image src="/assets/mainpage/christmas/button-enter.png" alt="로그인" width={500} height={90} />
        </div>
      )}
    </>
  );
}

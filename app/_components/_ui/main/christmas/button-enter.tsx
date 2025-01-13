import Image from 'next/image';
import Link from 'next/link';

import { URLS } from '@/app/constants';
import { signIn } from '@/auth';

interface IButtonEnterProps {
  className?: string;
  isLogin: boolean;
}

async function loginAction() {
  await signIn('google', {
    //   callbackUrl: `${window.location.protocol}//${window.location.hostname}/api/auth/callback/google`,
    callbackUrl: `/api/auth/callback/google`,
  });
}

export default function ButtonEnter({ isLogin, className }: IButtonEnterProps) {
  return (
    <>
      {isLogin && (
        <Link href={URLS.getMypagePageByKind('studio')} className={className}>
          <Image
            src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/mainpage/christmas/button-enter.png"
            alt="게임 입장"
            width={500}
            height={90}
          />
        </Link>
      )}
      {!isLogin && (
        <div className={className} onClick={loginAction}>
          <Image src="https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/mainpage/christmas/button-enter.png" alt="로그인" width={500} height={90} />
        </div>
      )}
    </>
  );
}

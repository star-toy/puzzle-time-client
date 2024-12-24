import Image from 'next/image';
import Link from 'next/link';

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full bg-[#D4BDA5] bg-[url('/assets/mypage/christmas/bg-bricks.png')] bg-no-repeat bg-center bg-cover">
      <div className="absolute top-0 left-0 w-full z-10 flex items-start justify-between px-[203px]">
        <Link href="/">
          <Image src="/assets/mypage/christmas/button-home.png" alt="back" width={150} height={210} />
        </Link>
        <Link href="/">
          <Image src="/assets/mypage/christmas/button-logout.png" alt="back" width={150} height={210} />
        </Link>
      </div>

      <div className="absolute bottom-[14px] left-0 w-full z-10">{children}</div>
    </div>
  );
}

import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { URLS } from '@/app/constants';

interface IMypageNavProps {
  activePage: 'gallery' | 'studio';
  className?: string;
}

const NAV_ITEMS = {
  gallery: {
    title: 'GALLERY',
    background: 'https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/components/nav/nav-gallery-active.png',
  },
  studio: {
    title: 'STUDIO',
    background: 'https://s3.ap-northeast-2.amazonaws.com/puzzletime.fun/assets/components/nav/nav-studio-active.png',
  },
};

export default function MypageNav({ activePage, className }: IMypageNavProps) {
  const navItem = NAV_ITEMS[activePage];

  if (!navItem) return null;

  return (
    <div className={cx('w-[800px] h-[215px]', className)}>
      <Image src={navItem.background} alt={navItem.title} width={800} height={215} />
      <div className="absolute top-[60px] left-0 w-[800px] h-[150px] flex flex-row items-start z-10">
        <Link href={URLS.getMypagePageByKind('studio')} className="w-6/12 h-full" />
        <Link href={URLS.getMypagePageByKind('gallery')} className="w-6/12 h-full" />
      </div>
    </div>
  );
}

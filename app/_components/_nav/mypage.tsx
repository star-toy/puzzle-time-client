import Image from 'next/image';
import Link from 'next/link';

interface IMypageNavProps {
  activePage: 'gallery' | 'studio';
  className?: string;
}

const NAV_ITEMS = {
  gallery: {
    title: 'GALLERY',
    background: '/assets/components/nav/nav-gallery-active.png',
  },
  studio: {
    title: 'STUDIO',
    background: '/assets/components/nav/nav-studio-active.png',
  },
};

export default function MypageNav({ activePage, className }: IMypageNavProps) {
  const navItem = NAV_ITEMS[activePage];

  if (!navItem) return null;

  return (
    <div className={className || 'fixed z-20 top-0 left-[50%] -translate-x-1/2 w-[800px] h-[215px]'}>
      <Image src={navItem.background} alt={navItem.title} width={800} height={215} />
      <div className="absolute top-[60px] left-0 w-[800px] h-[150px] flex flex-row items-start z-10">
        <Link href="/mypage/studio" className="w-6/12 h-full" />
        <Link href="/mypage/gallery" className="w-6/12 h-full" />
      </div>
    </div>
  );
}

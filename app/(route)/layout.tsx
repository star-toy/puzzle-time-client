'use client';

import { useEffect, useRef } from 'react';

import { SCREEN_WIDTH } from '../constants';

import { debounce } from '@/app/_utils/debounce';

export default function Layout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const scale = width / SCREEN_WIDTH;
      if (containerRef.current) {
        containerRef.current.style.transform = `scale(${scale})`;
        containerRef.current.style.transformOrigin = 'top left';
      }
    }, 200);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-[1920px] h-[1080px] max-w-[1920px] max-h-[1080px]">
      {children}
    </div>
  );
}

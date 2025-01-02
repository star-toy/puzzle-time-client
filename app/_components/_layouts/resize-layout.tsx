'use client';

import { useEffect, useRef } from 'react';

import { debounce } from '@/app/_utils/debounce';
import { getScreenScale } from '@/app/_utils/screen';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/app/constants';

export default function ResizeLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = debounce(() => {
      const scale = getScreenScale(window, SCREEN_WIDTH, SCREEN_HEIGHT);

      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 0.5s ease';
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

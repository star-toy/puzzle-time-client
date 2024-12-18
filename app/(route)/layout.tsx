'use client';

import { useEffect } from 'react';

import { SCREEN_WIDTH } from '../constants';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ZoomHandler>
      <div className="w-[1920px] h-[1080px] max-w-[1920px] max-h-[1080px]">{children}</div>
    </ZoomHandler>
  );
}

function ZoomHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const scale = width / SCREEN_WIDTH;
      document.body.style.transform = `scale(${scale})`;
      document.body.style.transformOrigin = 'top left';
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return children;
}

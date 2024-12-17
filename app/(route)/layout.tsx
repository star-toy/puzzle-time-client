'use client';

import { useEffect } from 'react';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ZoomHandler>
      <div className="w-[1920px] h-[1080px] max-w-[1920px] max-h-[1080px]">{children}</div>
    </ZoomHandler>
  );
}

const SCREEN_WIDTH = 1920;

function ZoomHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const scale = width / SCREEN_WIDTH;
      document.body.style.zoom = scale.toString();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return children;
}

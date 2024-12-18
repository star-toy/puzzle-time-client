'use client';

import React, { useEffect } from 'react';

import { SCREEN_WIDTH } from './constants';

import '@/app/_styles/globals.css';

import ReactQueryDevToolsProvider from '@/app/_components/_providers/ReactQueryProvider';
import { debounce } from '@/app/_utils/debounce';

function ZoomHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      const scale = width / SCREEN_WIDTH;
      document.body.style.zoom = scale.toString();
    }, 200); // 200ms 딜레이

    // 초기 로드 시 바로 적용 (debounce 없이)
    const width = window.innerWidth;
    const scale = width / SCREEN_WIDTH;
    document.body.style.zoom = scale.toString();

    // resize 이벤트에는 debounce 적용
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return children;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryDevToolsProvider>
          <ZoomHandler>{children}</ZoomHandler>
        </ReactQueryDevToolsProvider>
      </body>
    </html>
  );
}

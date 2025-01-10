'use client';

import type React from 'react';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ResizeLayout from '../_components/_layouts/resize-layout';
import { URLS } from '../constants';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    fetch(URLS.refreshTokenClient(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: session?.data?.accessToken,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((data: { accessToken: string; refreshToken: string }) => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
            })
            .catch(() => {});
        }
        if (response.status === 401) {
          if (window.location.pathname !== URLS.getLoginPage()) {
            router.push(URLS.getRootPage());
          }
        }
      })
      .catch(() => {
        console.log('refresh token failed');
        router.push(URLS.getRootPage());
      });
  }, [session, router]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResizeLayout>{children}</ResizeLayout>
    </Suspense>
  );
}

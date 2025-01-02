import React from 'react';

import '@/app/_styles/globals.css';

import AuthProvider from '@/app/_components/_providers/auth-provider';
import ReactQueryDevToolsProvider from '@/app/_components/_providers/ReactQueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <ReactQueryDevToolsProvider>{children}</ReactQueryDevToolsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

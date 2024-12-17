import type React from 'react';

import '@/app/_styles/globals.css';

import ReactQueryDevToolsProvider from '@/app/_components/_providers/ReactQueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryDevToolsProvider>{children}</ReactQueryDevToolsProvider>
      </body>
    </html>
  );
}

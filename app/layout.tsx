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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-amatica">
        <AuthProvider>
          <ReactQueryDevToolsProvider>{children}</ReactQueryDevToolsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

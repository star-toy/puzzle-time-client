import '@/app/_styles/globals.css';

import type React from 'react';

import ReactQueryDevToolsProvider
  from '@/app/_components/_providers/ReactQueryProvider';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<ReactQueryDevToolsProvider>
				<body>{children}</body>
			</ReactQueryDevToolsProvider>
		</html>
	);
}

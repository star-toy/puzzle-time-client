import ReactQueryDevToolsProvider from "@/app/_components/_providers/ReactQueryProvider";
import "@/app/_styles/global.css";
import type React from "react";

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

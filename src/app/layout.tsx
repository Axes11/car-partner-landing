'use client';

import { LanguageProvider } from '@/shared/providers/languageProvider';
import './globals.css';
import { Oswald } from 'next/font/google';
import { LoadingProvider } from '@/shared/providers/loadingProvider';

const oswald = Oswald({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={oswald.className}>
			<head>
				<link rel='icon' href='/favicon.png' type='image/svg+xml' />
				<title>CARPARTNER</title>
			</head>
			<body>
				<LoadingProvider>
					<LanguageProvider>{children}</LanguageProvider>
				</LoadingProvider>
			</body>
		</html>
	);
}

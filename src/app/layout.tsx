'use client';

import { LanguageProvider } from '@/shared/providers/languageProvider';
import './globals.css';
import { Oswald } from 'next/font/google';
import { LoadingProvider } from '@/shared/providers/loadingProvider';
import { ModalProvider } from '@/shared/providers/modalProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
			<body style={{ overflowX: 'hidden' }}>
				<LoadingProvider>
					<LanguageProvider>
						<ModalProvider>
							<SpeedInsights />
							<>{children}</>
						</ModalProvider>
					</LanguageProvider>
				</LoadingProvider>
			</body>
		</html>
	);
}

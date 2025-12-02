'use client';

import { LanguageProvider } from '@/shared/providers/languageProvider';
import './globals.css';
import { Oswald } from 'next/font/google';
import { LoadingProvider } from '@/shared/providers/loadingProvider';
import { ModalProvider } from '@/shared/providers/modalProvider';
import { useModalScrollLock } from '@/hooks/useModalScrollLock';
import { SpeedInsights } from '@vercel/speed-insights/next';

const oswald = Oswald({ subsets: ['latin'] });

export function AppWrapper({ children }: { children: React.ReactNode }) {
	useModalScrollLock();

	return <>{children}</>;
}

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
					<LanguageProvider>
						<ModalProvider>
							<SpeedInsights />
							<AppWrapper>{children}</AppWrapper>
						</ModalProvider>
					</LanguageProvider>
				</LoadingProvider>
			</body>
		</html>
	);
}

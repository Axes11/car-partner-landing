'use client';

import { LanguageProvider } from '@/shared/providers/languageProvider';
import './globals.css';
import { Oswald } from 'next/font/google';

const oswald = Oswald({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={oswald.className}>
			<body>
				<LanguageProvider>{children}</LanguageProvider>
			</body>
		</html>
	);
}

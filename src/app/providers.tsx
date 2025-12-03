'use client';

import { LanguageProvider } from '@/shared/providers/languageProvider';
import { LoadingProvider } from '@/shared/providers/loadingProvider';
import { ModalProvider } from '@/shared/providers/modalProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LoadingProvider>
			<LanguageProvider>
				<ModalProvider>
					<SpeedInsights />
					{children}
				</ModalProvider>
			</LanguageProvider>
		</LoadingProvider>
	);
}

'use client';

import { createContext, useState } from 'react';
import { useLoadingContext } from '../context/loadingContext';

export type LanguageContextType = {
	ln: 'ua' | 'ru';
	toggleLanguage: (lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [language, setLanguage] = useState('ua');
	const loadingState = useLoadingContext();

	const toggleLanguage = (lang: string) => {
		setLanguage(lang);
		loadingState?.setIsLoading(true);
		setTimeout(() => {
			loadingState?.setIsLoading(false);
		}, 1500);
	};

	return (
		<LanguageContext.Provider
			value={{ ln: language as 'ua' | 'ru', toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

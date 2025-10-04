'use client';

import { createContext, useState } from 'react';

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

	const toggleLanguage = (lang: string) => {
		setLanguage(lang);
	};

	return (
		<LanguageContext.Provider
			value={{ ln: language as 'ua' | 'ru', toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

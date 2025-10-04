import { useLanguageContext } from "@/shared/context/languageContext";
import { RU } from "@/locales/ru";
import { UA } from "@/locales/ua";

export function useLanguage(category: string) {
	const languageContext = useLanguageContext();
	if (!languageContext) return null;

	const ln = languageContext.ln;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const res = ln === 'ua' ? UA[category] : RU[category];

	return { ln, res };
}
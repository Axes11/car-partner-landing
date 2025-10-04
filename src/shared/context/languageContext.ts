import { useContext } from "react";
import { LanguageContext } from "../providers/languageProvider";
import { LanguageContextType } from "../providers/languageProvider";

export const useLanguageContext = (): LanguageContextType | null => {
    return useContext(LanguageContext);
};
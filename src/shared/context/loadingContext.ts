import { useContext } from "react";
import { LoadingContext } from "../providers/loadingProvider";
import { LoadingContextType } from "../providers/loadingProvider";

export const useLoadingContext = () : LoadingContextType | null => {
    return useContext(LoadingContext);
}
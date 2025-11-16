import { useContext } from "react";
import { ModalContext, ModalContextType } from "../providers/modalProvider";

export const useModalContext = () : ModalContextType | null => {
    return useContext(ModalContext);
}
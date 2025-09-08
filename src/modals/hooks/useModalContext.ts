import { useContext } from "react";
import { ModalContext } from "../modalContext";

export const useModalContext = () => {
    const modalContext = useContext(ModalContext);
    if(!modalContext) {
        throw new Error("Can not retrieve context before initialized");
    }
    const { modalList, showModal, closeModal } = modalContext;
    return {
        modalList,
        showModal,
        closeModal
    };
};
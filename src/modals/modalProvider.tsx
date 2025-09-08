import { useState, type FC } from "react";
import { ModalMap } from "./constant";
import type { ModalItem } from "./types";
import { ModalContext } from "./modalContext";

export const ModalProvider: FC<any> = ({ children }) => {
    const [modalList, setModalList] = useState<ModalItem[]>([]);

    const showModal = (modalId: string, props?: Record<string, any>) => {
        setModalList(list => {
            const filteredList = list.filter(item => item.modalId !== modalId);
            const modalItem: ModalItem = {
                comp: ModalMap[modalId],
                modalId,
                props: {
                    ...props || {},
                    close: () => closeModal(modalId)
                }
            };
            return [...filteredList, modalItem];
        });
    };

    const closeModal = (modalId: string) => {
        setModalList(list => list.filter(item => item.modalId != modalId));
    };

    const value = {
        modalList,
        showModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
            {modalList.map(item => (
                <item.comp key={item.modalId} {...item.props}/>
            ))}
        </ModalContext.Provider>
    );
};


import type { FC } from "react";

export interface BaseProps {
    close: VoidFunction
}

export interface ModalItem {
    comp: FC<any>,
    modalId: string,
    props: Record<string, any>
}

export interface IModalCtx {
    modalList: ModalItem[];
    showModal: (modalId: string, props?: Record<string, any>) => void;
    closeModal: (modalId: string) => void;
}
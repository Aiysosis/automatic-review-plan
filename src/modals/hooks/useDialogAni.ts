import { useCallback, useEffect, useState } from "react";
import { waitSomeTime } from "../../utils/wait";

export const useDialogShowAnim = (modalId: string) => {
    const [show, setShow] = useState(false);
    const [close, setClose] = useState(false);

    useEffect(() => {
        if (show) {
            (document.getElementById(modalId) as any).showModal();
        }
    }, [modalId, show]);

    useEffect(() => {
        if (close) {
            (document.getElementById(modalId) as any).close();
        }
    }, [close, modalId]);

    const showAnim =  useCallback(async (cb?: VoidFunction) => {
        setShow(true);
        await waitSomeTime(300);
        cb?.();
    }, []);

    const hideAnim =  useCallback(async (cb?: VoidFunction) => {
        setClose(true);
        await waitSomeTime(300);
        cb?.();
    }, []);

    return {
        showAnim,
        hideAnim
    };
};
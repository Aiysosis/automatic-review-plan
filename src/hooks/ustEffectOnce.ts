import { useEffect, useRef } from "react";

export const useEffectOnce = (effect: () => any) => {
    const effectRef = useRef(effect);
    useEffect(() => {
        const cleanup = effectRef.current();
        if (typeof cleanup === "function") {
            return cleanup;
        }
    }, []);
};
import { useEffectOnce } from "../hooks/ustEffectOnce";
import { getStorage, StorageKeys } from "../utils/localStorage";

export const useDebugHelpers = () => {
    useEffectOnce(() => {
        if (import.meta.env.DEV) {
            (window as any).showList = () => {
                console.log(getStorage(StorageKeys.reviewPlanList));
            };
        }
    });
};
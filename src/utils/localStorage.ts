export const StorageKeys = {
    reviewPlanList: "review-plan-list"
};

export const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export function getStorage<T>(key: string) {
    return JSON.parse(localStorage.getItem(key)) as T;
}
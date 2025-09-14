import { useState } from "react";
import { getCurTimeStampInDay } from "./utils/time";
import { reviewPlan } from "./constants";
import { getStorage, setStorage, StorageKeys } from "./utils/localStorage";
import { useEffectOnce } from "./hooks/ustEffectOnce";

export enum ReviewStatus {
    Normal = 'normal',
    Finish = 'finish'
}

export interface PlanItem {
    id: number;
    title: string;
    content: string;
    // unit: day
    fstLearn: number;
    nextReviewDay: number;
    planIdx: number;
    status: ReviewStatus;
    reviewRecords: number[];
}

export const useReviewPlanData = () => {
    const [allPlanList, setAllPlanList] = useState<PlanItem[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const updateAllPlanList = (updateFunc: (list: PlanItem[]) => PlanItem[]) => {
        setAllPlanList(list => {
            const res = updateFunc(list);
            res.sort((a, b) => a.fstLearn - b.fstLearn);
            setStorage(StorageKeys.reviewPlanList, res);
            return res;
        });
    };

    const getDisplayList = () => {
        const reviewList: PlanItem[] = [];
        const nextReviewList: PlanItem[] = [];
        const finishList: PlanItem[] = [];

        const curDay = getCurTimeStampInDay();
        for(const item of allPlanList) {
            if (item.status === ReviewStatus.Finish) {
                finishList.push(item);
                continue;
            }
            if(curDay >= item.nextReviewDay && item.status === ReviewStatus.Normal) {
                // need review
                reviewList.push(item);
                continue;
            }
            nextReviewList.push(item);
        }
        return {
            reviewList,
            nextReviewList,
            finishList
        };
    };

    useEffectOnce(() => {
        const list = getStorage<PlanItem[]>(StorageKeys.reviewPlanList) || [];
        updateAllPlanList(() => list);
        setDataLoaded(true);
    });

    const finishReview = (id: number) => {
        updateAllPlanList(list => {
            return list.map(item => {
                if (item.id !== id) {
                    return item;
                }
                if (item.planIdx >= reviewPlan.length) {
                    return {
                        ...item,
                        status: ReviewStatus.Finish,
                        reviewRecords: [...item.reviewRecords, getCurTimeStampInDay()]
                    };
                } else {
                    return {
                        ...item,
                        nextReviewDay: getCurTimeStampInDay() + reviewPlan[item.planIdx],
                        planIdx: item.planIdx + 1,
                        reviewRecords: [...item.reviewRecords, getCurTimeStampInDay()]
                    };
                }
            });
        });
    };

    const addItem = (title: string, content: string) => {
        const fstLearnDay = getCurTimeStampInDay();
        const initPlanIdx = 0;
        const newItem: PlanItem = {
            id: Date.now(),
            title,
            content,
            fstLearn: fstLearnDay,
            nextReviewDay: fstLearnDay + reviewPlan[initPlanIdx],
            planIdx: initPlanIdx + 1,
            status: ReviewStatus.Normal,
            reviewRecords: []
        };
        updateAllPlanList(list => [...list, newItem]);
    };

    const delItem = (id: number) => {
        updateAllPlanList(list => list.filter(item => item.id !== id));
    };

    return {
        dataLoaded,
        getDisplayList,
        finishReview,
        addItem,
        delItem
    };
};
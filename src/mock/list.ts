import { ReviewStatus, type PlanItem } from "../useReviewPlanData";
import { getCurTimeStampInDay } from "../utils/time";

export const mockPlanList = [
    {
        id: 1,
        title: "title1",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay() - 1,
        nextReviewDay: getCurTimeStampInDay(),
        planIdx: 0,
        status: ReviewStatus.Normal,
        reviewRecords: []
    },
    {
        id: 11,
        title: "title1",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay() - 1,
        nextReviewDay: getCurTimeStampInDay(),
        planIdx: 0,
        status: ReviewStatus.Normal,
        reviewRecords: []
    },
    {
        id: 2,
        title: "title2",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay(),
        nextReviewDay: getCurTimeStampInDay() + 1,
        planIdx: 1,
        status: ReviewStatus.Normal,
        reviewRecords: []
    },
    {
        id: 22,
        title: "title2",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay(),
        nextReviewDay: getCurTimeStampInDay() + 1,
        planIdx: 1,
        status: ReviewStatus.Normal,
        reviewRecords: []
    },
    {
        id: 3,
        title: "title2",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay(),
        nextReviewDay: getCurTimeStampInDay(),
        planIdx: 1,
        status: ReviewStatus.Finish,
        reviewRecords: []
    },
    {
        id: 33,
        title: "title2",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurTimeStampInDay(),
        nextReviewDay: getCurTimeStampInDay(),
        planIdx: 1,
        status: ReviewStatus.Finish,
        reviewRecords: []
    }
] as PlanItem[];
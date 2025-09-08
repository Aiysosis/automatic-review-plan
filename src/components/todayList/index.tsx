import { Fragment } from "react/jsx-runtime";
import { useModalContext } from "../../modals/hooks/useModalContext";
import { ModalId } from "../../modals/constant";
import { reviewPlan } from "../../constants";
import type { PlanItem } from "../../useReviewPlanData";

interface IProps {
    todayList: PlanItem[];
    finishReview: (id: number) => void;
    delItem: (id: number) => void;
}

const TodayList = (props: IProps) => {
    const { todayList, finishReview, delItem } = props;
    const { showModal } = useModalContext();

    const renderPlanItem = (item: PlanItem) => {
        const { id, planIdx, title, content } = item;
        const finishPercent = (planIdx / reviewPlan.length) * 100;

        return (
            <Fragment key={id}>
                <div className='sm:flex sm:items-center p-4 relative bg-green-50 rounded-box shadow-md mt-4 dark:bg-emerald-900'>
                    <div className='flex-1'>
                        <div className='font-bold text-lg'>{title}</div>
                        <div className='flex items-center mt-4'>
                            <progress className="progress progress-accent w-48" value={finishPercent} max="100"></progress>
                            <div className='ml-4 whitespace-nowrap'>Round: <span className="text-sky-400">{planIdx}/{reviewPlan.length}</span></div>
                        </div>
                        <div className='mt-2 whitespace-pre-wrap'>{content}</div>
                    </div>
                    <div className='flex-none flex items-center mt-2 sm:mt-0'>
                        <button className="btn btn-circle btn-ghost" onClick={() => showModal(ModalId.confirmFinish, { finishReview: () => finishReview(id) })}>
                            <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </button>
                        <button className="btn btn-circle btn-ghost ml-3" onClick={() => showModal(ModalId.confirmDelete, { delReview: () => delItem(id) })}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <div className='mt-4'>
            <div className='text-xl'>Today</div>
            {todayList.length > 0 ? todayList.map(renderPlanItem) : (
                <div className="my-4">Let's call it a day!</div>
            )}
        </div>
    );
};

export default TodayList;
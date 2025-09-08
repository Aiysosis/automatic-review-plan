import { Fragment } from "react/jsx-runtime";
import type { PlanItem } from "../../useReviewPlanData";

interface IProps {
    finishedList: PlanItem[];
}

const FinishedList = (props: IProps) => {
    const { finishedList } = props;

    const renderPlanItem = (item: PlanItem) => {
        const { id } = item;

        return (
            <Fragment key={id}>
                <div className='flex items-center p-4 relative rounded-box shadow-md bg-base-200 mt-4 dark:bg-gray-800'>
                    <div className='flex-1'>
                        <div className='font-bold text-lg'>{item.title}</div>
                        <div className='mt-2 whitespace-pre-wrap'>{item.content}</div>
                    </div>
                    <div className='flex-none flex items-center'>
                    </div>
                </div>
            </Fragment>
        );
    };

    return (
        <div className='mt-4'>
            <div className='text-xl'>Finished list</div>
            {finishedList.length > 0 ? finishedList.map(renderPlanItem) : (
                <div className="my-4">Nothing has been finished yet</div>
            )}
        </div>
    );
};

export default FinishedList;
import { useModalContext } from './modals/hooks/useModalContext';
import { ModalId } from './modals/constant';
import TodayList from './components/todayList';
import NextPreview from './components/nextPreview';
import FinishedList from './components/finishedList';
import { useReviewPlanData } from './useReviewPlanData';
import { useDebugHelpers } from './test/useDebugHelpers';

function App() {
    const { getDisplayList, finishReview, addItem, delItem, dataLoaded } = useReviewPlanData();
    const { showModal } = useModalContext();
    const { reviewList, nextReviewList, finishList } = getDisplayList();
    useDebugHelpers();

    if (!dataLoaded) {
        return null;
    }
    return (
        <>
            <div className='max-w-2xl mx-auto p-4 pb-16'>
                <TodayList todayList={reviewList} finishReview={finishReview} delItem={delItem} />
                <NextPreview nextReviewList={nextReviewList} delItem={delItem} />
                <FinishedList finishedList={finishList} />
            </div>
            <button className="btn btn-circle fixed right-4 bottom-4" onClick={() => showModal(ModalId.createReview, { addItem })}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </>
    );
}

export default App;

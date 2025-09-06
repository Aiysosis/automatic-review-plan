import { Fragment, useEffect, useState } from 'react'
import { useModalContext } from './modals/hooks/useModalContext';
import { ModalId } from './modals/constant';

enum ReviewStatus {
  Normal = 'normal',
  Finish = 'finish'
}

interface ListItem {
  id: number;
  title: string;
  content: string;
  // unit: day
  fstLearn: number;
  nextReviewDay: number;
  planIdx: number;
  status: ReviewStatus;
}

const reviewPlan = [1, 3, 7, 15];
const storageKey = 'review-plan-items';
const dayTime = 1000 * 60 * 60 * 24;

const getCurDay = () => {
  return Math.floor(Date.now() / dayTime);
}

const updateStorage = (list: ListItem[]) => {
  localStorage.setItem(storageKey, JSON.stringify(list))
}

function App() {
  const [allList, setAllList] = useState<ListItem[]>([]);
  const { showModal } = useModalContext();

  const getDisplayList = () => {
    const reviewList: ListItem[] = [];
    const nextReviewList: ListItem[] = [];
    const finishList: ListItem[] = [];

    const curDay = getCurDay();
    for(const item of allList) {
      if (item.status === ReviewStatus.Finish) {
        finishList.push(item);
        continue;
      }
      if(curDay >= item.nextReviewDay && item.status === ReviewStatus.Normal) {
        // need review
        reviewList.push(item)
        continue;
      }
      nextReviewList.push(item)
    }
    return {
      reviewList,
      nextReviewList,
      finishList
    }
  }

  const { reviewList, nextReviewList, finishList } = getDisplayList();

  useEffect(() => {
    // const list = (JSON.parse(localStorage.getItem(key)) || []) as ListItem[]
    const list = [
      {
        id: 1,
        title: "title1",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurDay() - 1,
        nextReviewDay: getCurDay(),
        planIdx: 0,
        status: ReviewStatus.Normal
      },
      {
        id: 2,
        title: "title2",
        content: '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
        // unit: day
        fstLearn: getCurDay(),
        nextReviewDay: getCurDay() + 1,
        planIdx: 0,
        status: ReviewStatus.Normal
      }
    ]
    list.sort((a, b) => a.fstLearn - b.fstLearn);
    setAllList(list)
  }, [])

  const finishReview = (id: number) => {
    setAllList(list => {
      return list.map(item => {
        if (item.id !== id) {
          return item;
        }
        if (item.planIdx === reviewPlan.length) {
          return {
            ...item,
            status: ReviewStatus.Finish
          };
        } else {
          return {
            ...item,
            nextReviewDay: getCurDay() + reviewPlan[item.planIdx],
            planIdx: item.planIdx + 1
          };
        }
      })
    })
  }

  const addItem = (title: string, content: string) => {
    const nowTime = Date.now();
    const fstLearnDay = Math.floor(nowTime / dayTime);
    const initPlanIdx = 0;
    const newItem: ListItem = {
      id: nowTime,
      title,
      content,
      fstLearn: fstLearnDay,
      nextReviewDay: fstLearnDay + reviewPlan[initPlanIdx],
      planIdx: initPlanIdx,
      status: ReviewStatus.Normal
    }
    setAllList(list => {
      const newList = [...list, newItem];
      newList.sort((a, b) => a.fstLearn - b.fstLearn)
      updateStorage(newList)
      return newList
    })
  }

  const delItem = (id: number) => {
    setAllList(list => list.filter(item => item.id !== id))
  }

  return (
    <>
      <div className='flex'>
        <div className='w-[36rem] list bg-base-100 rounded-box shadow-md mx-auto mt-4'>
          <div className='text-xl'>Today</div>
          {reviewList.map((item, idx) => {
            return (
              <Fragment key={item.id}>
                <div className='flex items-center p-4 relative' key={item.id}>
                  <div className='flex-1'>
                    <div className='font-bold text-lg'>{item.title}</div>
                    <div className='mt-2'>{item.content}</div>
                  </div>
                  <div className='flex-none flex items-center'>
                    <button className="btn btn-circle btn-ghost" onClick={() => showModal(ModalId.confirmFinish, { finishReview: () => finishReview(item.id) })}>
                      <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </button>
                    <button className="btn btn-circle btn-ghost ml-3" onClick={() => showModal(ModalId.confirmDelete, { delReview: () => delItem(item.id) })}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                {idx < reviewList.length - 1 ? <div className='h-0 w-[90%] mx-auto border-b-gray-200 border-b' /> : <></>}
              </Fragment>
            )
          })}
        </div>
        <div className='w-[36rem] list bg-base-100 rounded-box shadow-md mx-auto mt-4 ml-8'>
          <div className='text-xl'>All plan</div>
          {[...nextReviewList, ...finishList].map((item, idx) => {
            return (
              <Fragment key={item.id}>
                <div className='flex items-center p-4 relative' key={item.id}>
                  <div className='flex-1'>
                    <div className='font-bold text-lg'>{item.title}</div>
                    <div className='font-bold mt-2'></div>
                    <div className=''>{item.content}</div>
                  </div>
                  <div className='flex-none flex items-center'>
                    <button className="btn btn-circle btn-ghost ml-3" onClick={() => showModal(ModalId.confirmDelete, { delReview: () => delItem(item.id) })}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                {idx < nextReviewList.length + finishList.length - 1 ? <div className='h-0 w-[90%] mx-auto border-b-gray-200 border-b' /> : <></>}
              </Fragment>
            )
          })}
        </div>
      </div>
      <button className="btn btn-circle fixed right-4 bottom-4" onClick={() => showModal(ModalId.createReview, { addItem })}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </>
  )
}

export default App

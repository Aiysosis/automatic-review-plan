export const dayTime = 1000 * 60 * 60 * 24;

export const getTimeStampInDay = (timeStampInMs: number) => {
    return Math.floor(timeStampInMs / dayTime);
};

export const getCurTimeStampInDay = () => {
    return getTimeStampInDay(Date.now());
};

export const formatTimeStampInDay = (timeStampInDay: number) => {
    const curDate = new Date(timeStampInDay * dayTime);
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const date = curDate.getDate();

    return {
        year,
        month,
        date
    };
};
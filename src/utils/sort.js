import dayjs from 'dayjs';

const sortByTime = (timeA, timeB) => dayjs(timeA.dateFrom).diff(dayjs(timeA.dateTo)) > dayjs(timeB.dateFrom).diff(dayjs(timeB.dateTo)) ? 1 : -1;
const sortByPrice = (priceA, priceB) => priceA.basePrice < priceB.basePrice ? 1 : -1;
const sortByDate = (dateA, dateB) => dateA.dateFrom > dateB.dateFrom ? 1 : -1;

export {sortByTime, sortByPrice, sortByDate};

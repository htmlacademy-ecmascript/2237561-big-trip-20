import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
const humanizePointDate = (date, format) => dayjs(date).format(format);

function getPointDuration(dateFrom, dateTo) {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[d] HH[h] mm[m]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[h] mm[m]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[m]');
      break;
  }

  return pointDuration;
}

export {getRandomArrayElement, getRandomInteger, humanizePointDate, getPointDuration};

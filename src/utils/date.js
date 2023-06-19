import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;

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

function isPointFuture (point){
  return dayjs().isBefore(point.dateFrom);
}
function isPointPresent (point){
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}
function isPointPast (point){
  return dayjs().isAfter(point.dateTo);
}
export {humanizePointDate, getPointDuration, isPointFuture, isPointPresent, isPointPast};

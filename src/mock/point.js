import dayjs from 'dayjs';
import {getRandomArrayElement, getRandomInteger} from '../util.js';
import {CITIES, OFFER_TYPES, OFFERS, TripPrice, Duration} from '../const.js';

const destinationDescription = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'O bella ciao, bella ciao, bella ciao ciao ciao',
  'E dirà oh che bel fior',
];
const destination = {
  description: getRandomArrayElement(destinationDescription),
  name: getRandomArrayElement(CITIES),
  pictures: [
    {
      src: `https://loremflickr.com/248/152?${getRandomInteger(0,5)}`,
      description: getRandomArrayElement(destinationDescription)
    }
  ]
};

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

function getDate({next}){
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);
  if(next){
    date = dayjs(date).add(minsGap, 'minute').add(hoursGap, 'hour').add(daysGap, 'day').toDate();
  }
  return date;
}

const typePoint = OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)];

const mockPoint = [
  {
    id: getRandomInteger(1,9),
    basePrice: getRandomInteger(TripPrice.MIN, TripPrice.MAX),
    dateFrom: getDate({next: true}),
    dateTo: getDate({next: true}),
    destination: destination,
    isFavorite: !!getRandomInteger(0,1),
    type: typePoint,
    offer: OFFERS[typePoint],
  }
];
function getRandomPoint(){
  return getRandomArrayElement(mockPoint);
}

export {getRandomPoint};

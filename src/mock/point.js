/*import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomArrayElement, getRandomInteger} from '../utils/common.js';
import {CITIES, TYPES, OFFERS, TripPrice, Duration} from '../const.js';

const destinationDescription = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'O bella ciao, bella ciao, bella ciao ciao ciao',
  'E dirà oh che bel fior',
];
const generateDestination = () => ({
  description: getRandomArrayElement(destinationDescription),
  name: CITIES[getRandomInteger(0, CITIES.length - 1)],
  pictures: [
    {
      src: `https://loremflickr.com/248/152?${getRandomInteger(0,100)}`,
      description: getRandomArrayElement(destinationDescription)
    }
  ]
});

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

const generateMockPoint = () => {
  const typePoint = TYPES[getRandomInteger(0, TYPES.length - 1)];
  return {
    id: nanoid(),
    basePrice: getRandomInteger(TripPrice.MIN, TripPrice.MAX),
    dateFrom: getDate({next: true}),
    dateTo: getDate({next: true}),
    destination: generateDestination(),
    isFavorite: !!getRandomInteger(0,1),
    type: typePoint,
    offer: OFFERS[typePoint],
  };
};

export {generateMockPoint, generateDestination};*/

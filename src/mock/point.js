import {getRandomArrayElement, getRandomInteger} from '../util.js';
import {POINT_TYPES, CITIES, OFFER_TYPES, OFFERS} from '../const.js';

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

const typePoint = OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)];

const mockPoint = [
  {
    id: getRandomArrayElement(POINT_TYPES),
    basePrice: getRandomInteger(1000, 10000),
    dateFrom: new Date('2019-07-10 22:55'),
    dateTo: new Date('2019-07-11 11:22'),
    destination: destination,
    isFavorite: false,
    type: typePoint,
    offer: OFFERS[typePoint],
  }
];
function getRandomPoint(){
  return getRandomArrayElement(mockPoint);
}

export {getRandomPoint};

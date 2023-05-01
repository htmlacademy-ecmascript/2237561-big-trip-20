import {getRandomArrayElement, getRandomInteger} from '../util.js';
import {POINTS_TYPE, POINTS_ID, CITY} from '../const.js';

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Guide',
        price: 60
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Better car',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Add meal',
        price: 60
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Luggage transportation',
        price: 120
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Taxi pickup',
        price: 120
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Better view',
        price: 20
      }
    ]
  },
];
//const getType = () => getRandomArrayElement();

const destinationDescription = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'O bella ciao, bella ciao, bella ciao ciao ciao',
  'E dirà oh che bel fior',
];
const destination = {
  description: getRandomArrayElement(destinationDescription),
  name: getRandomArrayElement(CITY),
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(0,5)}`,
      description: getRandomArrayElement(destinationDescription)
    }
  ]
};
const mockPoint = [
  {
    id: getRandomArrayElement(POINTS_ID),
    basePrice: getRandomInteger(1000, 10000),
    dateFrom: new Date('2019-07-10 22:55'),
    dateTo: new Date('2019-07-11 11:22'),
    destination: destination,
    isFavorite: false,
    offers: getRandomArrayElement(OFFERS),
    type: getRandomArrayElement(POINTS_TYPE)
  }
];
function getRandomPoint(){
  return getRandomArrayElement(mockPoint);
}

export {getRandomPoint};

import {getRandomInteger} from './util.js';
const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Denver', 'Stockholm', 'Rio', 'Berlin', 'Tokyo', 'Nairobi', 'Lisboa', 'Moscow','Manila', 'Pamplona', 'Palermo'];


const OFFERS = {
  'taxi': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1)),
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'check-in': [
    {'id' : 1,
      'title': 'Add breakfast',
      'price': getRandomInteger(50, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id' : 1,
      'title': 'Lunch in city',
      'price': getRandomInteger(50, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'train': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'ship': [
    {
      'id' : 1,
      'title': 'Travel by train',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'drive': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Switch to comfort',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'flight': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 4,
      'title': 'Add luggage',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id' : 5,
      'title': 'Book tickets',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'bus': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'sightseeing': [
    {
      'id' : 1,
      'title': 'Add meal',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'restaurant': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(10, 100),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
};
export {POINT_TYPES, CITIES, OFFER_TYPES, OFFERS};

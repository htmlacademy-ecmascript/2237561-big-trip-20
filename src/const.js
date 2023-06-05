import {getRandomInteger} from './utils/common.js';
import {nanoid} from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
const SortType = {
  DAY: 'default',
  TIME: 'time',
  PRICE: 'price',
  EVENT: 'event',
  OFFERS: 'offers',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Denver', 'Stockholm', 'Rio', 'Berlin', 'Tokyo', 'Nairobi', 'Lisboa', 'Moscow','Manila', 'Pamplona', 'Palermo'];

const Duration = {
  DAY: 28,
  HOUR: 24,
  MIN: 59
};

const TripPrice = {
  MIN: 100,
  MAX: 5000
};

const OfferPrice = {
  MIN: 10,
  MAX: 100
};

const OFFERS = {
  'taxi': [
    {
      'id' : nanoid(),
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Choose the radio station',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    },
    {
      'id': nanoid(),
      'title': 'Upgrade to a business class',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'check-in': [
    {'id' : nanoid(),
      'title': 'Add breakfast',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    },
    {
      'id' : nanoid(),
      'title': 'Order a meal from the restaurant',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'train': [
    {
      'id' : nanoid(),
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'ship': [

  ],
  'drive': [
    {
      'id' : nanoid(),
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Choose the radio station',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'flight': [
    {
      'id' : nanoid(),
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Add luggage',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    },
    {
      'id' : nanoid(),
      'title': 'Book tickets',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'bus': [
    {
      'id' : nanoid(),
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }, {
      'id' : nanoid(),
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'sightseeing': [
    {
      'id' : nanoid(),
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
  'restaurant': [
    {
      'id' : nanoid(),
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
    }
  ],
};
const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};
export {CITIES, TYPES, OFFERS, Duration, TripPrice, OfferPrice, FilterType, Mode, SortType, UserAction, UpdateType};



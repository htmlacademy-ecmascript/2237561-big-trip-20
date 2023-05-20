import {getRandomInteger} from './utils/common.js';
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

const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
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
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1)),
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id': 3,
      'title': 'Upgrade to a business class',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'check-in': [
    {'id' : 1,
      'title': 'Add breakfast',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id' : 1,
      'title': 'Order a meal from the restaurant',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'train': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'ship': [
    {
      'id' : 1,
      'title': 'Travel by train',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id': 2,
      'title': 'Business lounge',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'drive': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Choose the radio station',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'flight': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 3,
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 4,
      'title': 'Add luggage',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    },
    {
      'id' : 5,
      'title': 'Book tickets',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'bus': [
    {
      'id' : 1,
      'title': 'Switch to comfort',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }, {
      'id' : 2,
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'sightseeing': [
    {
      'id' : 1,
      'title': 'Add meal',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
  'restaurant': [
    {
      'id' : 1,
      'title': 'Choose seats',
      'price': getRandomInteger(OfferPrice.MIN, OfferPrice.MAX),
      'selected' : Boolean(getRandomInteger(0, 1))
    }
  ],
};
const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export {CITIES, OFFER_TYPES, OFFERS, Duration, TripPrice, OfferPrice, FilterType, Mode, SortType};

import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import {sortByDate} from '../utils/sort.js';


const DESTINATIONS_ITEMS_MAX = 3;

const getDestinations = (points, destinations) => {
  if (points.length === null) {
    return '';
  }

  let selectedDestinations = destinations.filter((destination) => points.find((point) => point.destination === destination.id));

  selectedDestinations = selectedDestinations.map((destination) => destination.name);

  if (selectedDestinations.length > DESTINATIONS_ITEMS_MAX) {
    const firstDestination = destinations.find((destination) => points[0].destination === destination.id).name;
    const lastDestination = destinations.find((destination) => points.at(-1).destination === destination.id).name;

    return [firstDestination, lastDestination].join(' &mdash; ... &mdash; ');
  }

  return selectedDestinations.join(' &mdash; ');
};

const getTripDates = (points = []) => {
  const sortedPoints = points.sort(sortByDate);
  return(sortedPoints.length > 0)
    ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp${dayjs(sortedPoints.at(-1).dateTo).format('D MMM')}`
    : '';
};

const getTripPrice = (points, offers) => {
  if (points.length === 0) {
    return 0;
  }

  const basePricesSum = points.reduce((total, point) => total + point.basePrice, 0);
  let offersPriceSum = 0;

  for (const point of points) {
    const offersByType = offers.find((offer) => point.type === offer.type);

    for (const offer of offersByType.offers) {
      if (point.offers.includes(offer.id)) {
        offersPriceSum += offer.price;
      }
    }
  }

  const fullTripPrice = basePricesSum + offersPriceSum;

  return fullTripPrice;
};

function createTripMainInfoTemplate(points, destinations, offers) {

  return ` <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getDestinations(points, destinations)}</h1>

    <p class="trip-info__dates">${getTripDates(points)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(points, offers)}</span>
  </p>
</section>`;
}

export default class HeaderTripInfoView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(points, offers, destinations) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripMainInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}

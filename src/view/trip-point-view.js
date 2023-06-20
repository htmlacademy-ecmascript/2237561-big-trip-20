import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, getPointDuration} from '../utils/date.js';
import { getOffersByType, getSelectedDestination, getSelectedOffers } from '../utils/point.js';

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return '';
  }
  return offers
    .map(
      (offer) =>
        `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`
    ).join('');
};

function createTripPointTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;

  const tripPointDate = humanizePointDate(dateFrom, 'YYYY-MM-DD');
  const tripPointDay = humanizePointDate(dateFrom, 'MMM D');
  const tripStartDate = humanizePointDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const tripStartTime = humanizePointDate(dateFrom, 'HH:mm');
  const triptEndDate = humanizePointDate(dateTo, 'YYYY-MM-DDTHH:mm');
  const tripEndTime = humanizePointDate(dateTo, 'HH:mm');
  const tripDuration = getPointDuration(dateFrom, dateTo);

  const isFavoritePoint = isFavorite
    ? 'event__favorite-btn--active'
    : '';
  const offersType = getOffersByType(offers, point.type);
  const destination = getSelectedDestination(
    destinations, point.destination);

  offers = getSelectedOffers(offersType, point.offers);

  if (!destination) {
    return '';
  }
  const {name} = destination;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${tripPointDate}">${tripPointDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${tripStartDate}">${tripStartTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${triptEndDate}">${tripEndTime}</time>
      </p>
      <p class="event__duration">${tripDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${createOffersTemplate(offers)}
    </ul>
    <button class="event__favorite-btn  ${isFavoritePoint}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export default class TripPointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = [];
  #handleEditPointClick = null;
  #handleFavoriteClick = null;

  constructor({point, allDestinations, allOffers, onEditPointClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#destinations = allDestinations;
    this.#offers = allOffers;
    this.#handleEditPointClick = onEditPointClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editPointClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditPointClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}

import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, getPointDuration} from '../util.js';

function createTripPointTemplate(point) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type, offer} = point;

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

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${tripPointDate}">${tripPointDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.name}</h3>
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
      <li class="event__offer">
        <span class="event__offer-title">${offer[0].title ? offer[0].title : ''}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer[0].price ? offer[0].price : ''}</span>
      </li>
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
  #handleEditPointClick = null;

  constructor({point, onEditPointClick}){
    super();
    this.#point = point;
    this.#handleEditPointClick = onEditPointClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editPointClickHandler);
  }

  get template() {
    return createTripPointTemplate(this.#point);
  }

  #editPointClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditPointClick();
  };
}

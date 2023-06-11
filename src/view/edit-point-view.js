import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {OFFERS, CITIES, TYPES, EditType} from '../const.js';
import {generateDestination} from '../mock/point.js';

const ButtonLabel = {
  [EditType.EDITING]: 'Delete',
  [EditType.CREATING]: 'Cancel',
};

function createDeleteButtonTemplate({type}){
  return `<button class="event__reset-btn" type="reset">${ButtonLabel[type]}</button> `;
}

function createRollupButtonTemplate(){
  return `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;
}

function createEditControlsTemplate({type}){
  return `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
${createDeleteButtonTemplate({type})}
${(!type !== EditType.CREATING) ? createRollupButtonTemplate() : ''}
  `;
}


function createEventOffers(offers) {
  return(
    `<section class="event__section  event__section--offers">
  ${(offers.length !== null ? `

    <div class="event__available-offers">
      ${offers.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-offer-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}">
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
    </div>` : '')}
  </section>`);
}

function createCitiesTemplate(cities) {
  return cities.map((city) => (`
<option value="${city}"></option>
`)).join('');
}

function createEditPointTemplate(point) {
  const {type, destination, dateFrom, dateTo, basePrice, offer, id} = point;
  let destinationPhotoes = '';

  const eventTypeTemplate = TYPES.map((eventType) =>
    `<div class="event__type-item">
      <input id="event-type-${eventType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-${id}">${eventType[0].toUpperCase() + eventType.slice(1)}</label>
    </div>`
  ).join('');

  if (destination.description){
    destinationPhotoes = destination.pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="Event photo">`
    ).join('');

    destinationPhotoes = `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destinationPhotoes}
        </div>
      </div>`;
  }

  const destinationPhotoesTemplate = `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${destinationPhotoes}
    </section>`;


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${eventTypeTemplate}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createCitiesTemplate(CITIES)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY hh:mm')}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY hh:mm')}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro; ${basePrice}
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=" ">
    </div>
  ${createEditControlsTemplate({type})}
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      ${createEventOffers(offer)}
    </section>
    ${destinationPhotoesTemplate}
  </section>
</form>
</li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #point = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleFormSubmit = null;
  #handleCloseFormClick = null;
  #handleDeleteClick = null;
  #type;

  constructor({point, onFormSubmit, onCloseClick, onDeleteClick, type = EditType.EDITING}){
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseFormClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#type = type;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#type);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    if(this.#type === EditType.EDITING){
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    }
    if(this.#type === EditType.CREATING){
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    }

    this.element.querySelector('.event__save-btn').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);


    const offerBlock = this.element.querySelector('.event__available-offers');
    if (offerBlock){
      offerBlock.addEventListener('change', this.#editOffersHandler);
    }
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);

    this.#setDatePicker();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseFormClick(EditPointView.parsePointToState(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offer: OFFERS[evt.target.value]
    });
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const eventDestinationInput = evt.target.closest('input[name="event-destination"]');
    this.updateElement({
      destination: {
        ...generateDestination(0),
        name: eventDestinationInput.value,
      },
    });
  };

  #editOffersHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offer: checkedBoxes.map((element) => element.dataset.offerId)
      }
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate,
      }
    });
    this.#datepickerTo.set('minDate', this._state.point.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate,
      }
    });
    this.#datepickerFrom.set('maxDate', this._state.point.dateTo);
  };

  #setDatePicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler,
        'time_24hr': true
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToChangeHandler,
        'time_24hr': true
      }
    );
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}

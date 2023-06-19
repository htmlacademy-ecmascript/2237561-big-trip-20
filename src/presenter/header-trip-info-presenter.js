import HeaderTripInfoView from '../view/header-trip-info-view.js';
import {remove, render, RenderPosition} from '../framework/render';
import {sortByDate} from '../utils/sort.js';
import {SortType} from '../const.js';

export default class HeaderTripInfoPresenter {
  #headerContainer = null;
  #tripInfoComponent = null;
  #pointsModel = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor(headerContainer, pointsModel) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;

    this.#points = this.#pointsModel.points;
    this.#offers = this.#pointsModel.offers;
    this.#destinations = this.#pointsModel.destinations;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init = () => {

    this.#points = sortByDate(this.#points, SortType.DAY);
    this.#tripInfoComponent = new HeaderTripInfoView(this.#points, this.#offers, this.#destinations);

    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModelEvent = () => {
    remove(this.#tripInfoComponent);

    this.#points = this.#pointsModel.points;
    this.#destinations = this.#pointsModel.destinations;
    this.#offers = this.#pointsModel.offers;

    this.init();
  };
}

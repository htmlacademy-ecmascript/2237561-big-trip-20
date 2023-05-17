import {render, replace} from '../framework/render.js';
//import EventListView from '../view/list-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      onEditPointClick: this.#handleEditPointClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#replaceFormToCard(),
    });
    render(this.#pointComponent, this.#pointListContainer.element);
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    //document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  #handleEditPointClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}

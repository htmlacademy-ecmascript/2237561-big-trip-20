import {render, replace, remove} from '../framework/render.js';
import {Mode, UserAction, UpdateType} from '../const.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new TripPointView({
      point: this.#point,
      onEditPointClick: this.#handleEditPointClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#handleCloseEditClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  };

  #handleEditPointClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseEditClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    //({...this.#point, isFavorite: !this.#point.isFavorite});
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleFormSubmit = (point) => {
    //this.#handleDataChange(point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
    this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

}

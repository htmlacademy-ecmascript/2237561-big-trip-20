import {render, replace} from '../framework/render.js';
import EventListView from '../view/list-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListEmptyView from '../view/edit-point-view.js';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();

  #eventPoints = [];

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#renderEventList();
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new TripPointView({
      point,
      onEditPointClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }});

    const editComponent = new EditPointView({
      point,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToCard();
      }
    });
    function replaceCardToForm() {
      replace(editComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, editComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#eventContainer);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      if(this.#eventPoints.length === 0){
        render(new ListEmptyView(), this.#eventContainer.element);
      }
      this.#renderPoint(this.#eventPoints[i]);
    }
  }
}

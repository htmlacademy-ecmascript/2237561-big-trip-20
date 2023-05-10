import {render} from '../framework/render.js';
import EventListView from '../view/list-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';

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

    render(this.#eventListComponent, this.#eventContainer);
    render(new EditPointView({point: this.#eventPoints[0]}), this.#eventListComponent.element);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      render(new TripPointView({point: this.#eventPoints[i]}), this.#eventListComponent.element);
    }
  }
}

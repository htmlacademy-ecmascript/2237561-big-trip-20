import {render, RenderPosition} from '../framework/render.js';
import EventListView from '../view/list-view.js';
import ListEmptyView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = new ListSortView();

  #eventPoints = [];

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#renderEventList();
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
    });
    pointPresenter.init(point);
  }

  #renderEventList(){
    render(this.#eventListComponent, this.#eventContainer);

    for (let i = 0; i < this.#eventPoints.length; i++) {
      if(this.#eventPoints.length === 0){
        render(new ListEmptyView(), this.#eventContainer.element);
      }
      this.#renderPoint(this.#eventPoints[i]);
      this.#renderSort();
    }
  }
}

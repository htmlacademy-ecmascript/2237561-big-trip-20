import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
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
  #pointPresenters = new Map();

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#renderEventList();
  }

  #handlePointChange = (updatedPoit) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoit);
    this.#pointPresenters.get(updatedPoit.id).init(updatedPoit);
  };

  #renderSort() {
    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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

import {render, RenderPosition} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {sortByTime, sortByPrice} from '../utils/sort.js';
import {SortType} from '../const.js';
import EventListView from '../view/list-view.js';
import ListEmptyView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;

  #eventPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderEventList();

    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#eventPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#eventPoints.sort(sortByPrice);
        break;
      default:
        this.#eventPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType); // - Сортируем задачи
    this.#clearPointList(); // - Очищаем список
    this.#renderEventList(); // - Рендерим список заново
  };

  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
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
    //this.#renderSort();
    for (let i = 0; i < this.#eventPoints.length; i++) {
      if(this.#eventPoints.length === 0){
        render(new ListEmptyView(), this.#eventContainer.element);
      }
      this.#renderPoint(this.#eventPoints[i]);
    }
  }
}

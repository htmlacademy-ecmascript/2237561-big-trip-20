import {render, RenderPosition} from '../framework/render.js';
//import {updateItem} from '../utils/common.js';
import {sortByTime, sortByPrice} from '../utils/sort.js';
import {SortType, UserAction, UpdateType} from '../const.js';
import EventListView from '../view/list-view.js';
import ListEmptyView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;

  //#eventPoints = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  //#sourcedBoardPoints = [];

  constructor({eventContainer, pointsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
        //this.#eventPoints.sort(sortByTime);
        // break;
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
       // this.#eventPoints.sort(sortByPrice);
       // break;
    }
    return this.#pointsModel.points;
  }

  init() {
    //this.#eventPoints = [...this.#pointsModel.points];

    //this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderEventList();

    this.#renderSort();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventList();
        this.#renderEventList();
        break;
      case UpdateType.MAJOR:
        this.#renderEventList({resetSortType: true});
        this.#renderEventList();
        break;
    }
  };

  #clearEventList({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }

  }

  /*#handlePointChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    // Здесь будем вызывать обновление модели
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };*/

  /*#sortPoints(sortType) {
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
  }*/

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    //this.#sortPoints(sortType); // - Сортируем задачи
    this.#currentSortType = sortType;
    this.#clearEventList(); // - Очищаем список
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  /*#clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
*/
  #renderEventList(){
    render(this.#eventListComponent, this.#eventContainer);
    //this.#renderSort();
    for (let i = 0; i < this.points.length; i++) {
      if(this.points.length === 0){
        render(new ListEmptyView(), this.#eventContainer.element);
      }
      this.#renderPoint(this.points[i]);
    }
  }
}

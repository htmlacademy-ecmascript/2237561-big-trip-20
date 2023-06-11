import {render, RenderPosition} from '../framework/render.js';
import {sortByDate, sortByTime, sortByPrice} from '../utils/sort.js';
import {SortType, FilterType, UserAction, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import EventListView from '../view/list-view.js';
import ListSortView from '../view/list-sort-view.js';
import PointPresenter from './point-presenter';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({eventContainer, pointsModel, filterModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints.sort(sortByDate);
  }

  init() {
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
        this.#renderEventList();
        this.#clearEventList({resetSortType: true});
        break;
    }
  };

  #clearEventList({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventList();
    this.#renderEventList();
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

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #renderEventList(){
    render(this.#eventListComponent, this.#eventContainer);
    this.#renderPoints();
    /*for (let i = 0; i < this.points.length; i++) {
      if(this.points.length === 0){
        render(new ListEmptyView(), this.#eventContainer.element);
      }
      this.#renderPoint(this.points[i]);
    }*/

  }
}

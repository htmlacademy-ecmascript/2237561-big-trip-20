import {render, remove, RenderPosition} from '../framework/render.js';
import {sortByDate, sortByTime, sortByPrice} from '../utils/sort.js';
import {BLANK_POINT, SortType, FilterType, UserAction, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import EventListView from '../view/list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter';
import NewEventPresenter from './new-event-presenter.js';

export default class EventPresenter {
  #eventContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #eventListComponent = new EventListView();
  #sortComponent = null;
  #noPointComponent = null;

  #pointPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor({eventContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDate);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  init() {
    this.#renderEventList();
    this.#renderSort();
  }

  createPoint() {
    const point = BLANK_POINT;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(point, this.destinations, this.offers);
  }

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
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
        this.#clearEventList({resetSortType: true});
        this.#renderEventList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderEventList();
        break;
    }
  };

  #clearEventList({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

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

    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderNoPoints(){
    this.#noPointComponent = new NoPointsView(this.#filterType);
    render(this.#noPointComponent, this.#eventContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, allDestinations, allOffers) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, allDestinations, allOffers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point,this.destinations, this.offers));
  };

  #renderEventList(){
    render(this.#eventListComponent, this.#eventContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    const points = this.points;

    if (!points.length) {
      this.#renderNoPoints();
      remove(this.#sortComponent); //сортировка не возвращается после закрытия новой формы
      return;
    }
    //this.#renderPoints();
    this.points.forEach((point) => this.#renderPoints(point, this.destinations, this.offers));
  }
}

//import ListSortView from './view/list-sort-view.js';
import TripMainInfoView from './view/header-main-info-view.js';
//import ListFilterView from './view/list-filter-view.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {render, RenderPosition} from './framework/render.js';
//import {generateFilter} from './mock/filter.js';


const tripMainInfoElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({eventContainer: tripEventsElement, pointsModel, filterModel});
//const filters = generateFilter(pointsModel.points);
const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel,
});

render(new TripMainInfoView(), tripMainInfoElement, RenderPosition.AFTERBEGIN);
//render(new ListFilterView({filters}), tripControlsFiltersElement);

filterPresenter.init();
eventPresenter.init();

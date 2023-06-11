import TripMainInfoView from './view/header-main-info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {render, RenderPosition} from './framework/render.js';


const tripMainInfoElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const eventPresenter = new EventPresenter({
  eventContainer: tripEventsElement,
  pointsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel,
});

render(new TripMainInfoView(), tripMainInfoElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
eventPresenter.init();

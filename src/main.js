import TripMainInfoView from './view/header-main-info-view.js';
import NewEventButtonView from './view/new-event-view.js';
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
const newPointButtonComponent = new NewEventButtonView({
  onClick: handleNewPointButtonClick
});

const eventPresenter = new EventPresenter({
  eventContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel,
});

function handleNewPointFormClose () {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick () {
  eventPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(new TripMainInfoView(), tripMainInfoElement, RenderPosition.AFTERBEGIN);
render(newPointButtonComponent, tripMainInfoElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
eventPresenter.init();

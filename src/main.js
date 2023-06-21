import NewEventButtonView from './view/new-event-view.js';
import EventPresenter from './presenter/trip-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import {render} from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic A5kEld3xsrdhnrtj534534gjgjgj';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';


const tripMainInfoElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const newPointButtonComponent = new NewEventButtonView({
  onClick: handleNewPointButtonClick
});

const eventPresenter = new EventPresenter({
  eventContainer: tripEventsElement,
  tripInfoContainer: tripMainInfoElement,
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

pointsModel.addObserver(()=> {
  newPointButtonComponent.element.disabled = pointsModel.flag;
});

filterPresenter.init();
eventPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, tripMainInfoElement);
});

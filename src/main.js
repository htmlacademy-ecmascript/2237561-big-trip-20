//import ListSortView from './view/list-sort-view.js';
import TripMainInfoView from './view/header-main-info-view.js';
import ListFilterView from './view/list-filter-view.js';
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import {render, RenderPosition} from './framework/render.js';
import {generateFilter} from './mock/filter.js';

const tripMainInfoElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();

const eventPresenter = new EventPresenter({eventContainer: tripEventsElement, pointsModel});
const filters = generateFilter(pointsModel.points);

render(new TripMainInfoView(), tripMainInfoElement, RenderPosition.AFTERBEGIN);
render(new ListFilterView({filters}), tripControlsFiltersElement);
//render(new ListSortView(), tripEventsElement);

eventPresenter.init();

import ListFilterView from './view/list-filter-view.js';
import ListSortView from './view/list-sort-view.js';
import TripMainInfoView from './view/header-main-info-view.js';
import EventPresenter from './presenter/event-presenter.js';
import PointsModel from './model/points-model.js';
import {render, RenderPosition} from './framework/render.js';

const tripMainInfoElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const eventPresenter = new EventPresenter({eventContainer: tripEventsElement, pointsModel});

render(new TripMainInfoView(), tripMainInfoElement, RenderPosition.AFTERBEGIN);
render(new ListFilterView(), tripControlsFiltersElement);
render(new ListSortView(), tripEventsElement);

eventPresenter.init();

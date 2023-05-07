import EventListView from '../view/list-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({eventContainer, pointsModel}) {
    this.eventContainer = eventContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getPoints()];

    render(this.eventListComponent, this.eventContainer);
    render(new EditPointView({point: this.eventPoints[0]}), this.eventListComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      render(new TripPointView({point: this.eventPoints[i]}), this.eventListComponent.getElement());
    }
  }
}

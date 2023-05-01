import EventListView from '../view/list-view.js';
import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

export default class EventPresenter {
  eventListComponent = new EventListView();

  constructor({eventContainer}) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(this.eventListComponent, this.eventContainer);
    render(new EditPointView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.eventListComponent.getElement());
    }
  }
}

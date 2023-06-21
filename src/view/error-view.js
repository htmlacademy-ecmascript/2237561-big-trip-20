import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = () => (
  `<p class="trip-events__msg">
     Oops! something happend, try again later.
    <img src="https://i.ibb.co/v3dMVX3/3cf5e1cacabb05b22554b03dcd633327.png" alt="что-то пошло не так" border="0">
  </p>`
);

export default class ErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createErrorTemplate();
  }
}

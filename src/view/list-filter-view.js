import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter) {
  const {type, hasPoints} = filter;
  return (`<div class="trip-filters__filter">
  <input id="filter-${type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  value="${type}"${hasPoints} ? '' : 'disabled'>
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`);
}

function createListFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');
  return (`<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class ListFilterView extends AbstractView {
  #filters = null;
  constructor({filters}){
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }
}

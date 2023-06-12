import AbstractView from '../framework/view/abstract-view.js';


function createFilterItemTemplate(filter, currentFilterType) {
  const {type, count} = filter;
  return (`<div class="trip-filters__filter">
  <input id="filter-${type}"
  class="trip-filters__filter-input  visually-hidden"
  type="radio"
  name="trip-filter"
  ${type === currentFilterType ? 'checked' : ''}
  ${count === 0 ? 'disabled' : ''}
  value="${type}"
  data-type="${type}">
  <label class="trip-filters__filter-label" for="filter-${type}" >${type}</label>
</div>`);
}

function createListFilterTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return (`<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class ListFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}){
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#filterTypeChangeHandler = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.type);
  };
}

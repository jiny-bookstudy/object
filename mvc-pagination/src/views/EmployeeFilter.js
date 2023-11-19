import { getQuerySelector, clearElement } from '../utils/DOMHandlers.js';
import { DROPDOWN_CONTAINER_ID } from '../constants/elements.js';

class EmployeeFilter {
  #filterOptions = [
    {
      name: '5개씩',
      value: 5
    },
    {
      name: '15개씩',
      value: 15
    }
  ];
  #builder = null;
  #container = null;
  #listeners = [];

  constructor(builder) {
    this.#builder = builder;
    this.#container = getQuerySelector(`#${DROPDOWN_CONTAINER_ID}`);
  }

  #reset($element) {
    clearElement($element);
  }

  #createDropdownItems(options) {
    return options.map((filter) => ({
      content: filter.name,
      value: filter.value
    }));
  }

  #attachEvent($element, listener) {
    $element.attachEvent('change', listener);
  }

  #notifyEventListeners(count) {
    this.#listeners.forEach((listener) => listener(count));
  }

  bindChangeCount(listener) {
    this.#listeners.push(listener);
  }

  render() {
    this.#reset(this.#container);
    const $dropdown = this.#builder.create(this.#createDropdownItems(this.#filterOptions));
    this.#container.appendChild($dropdown);
    this.#attachEvent(this.#builder, (e) => this.#notifyEventListeners(e.target.value));
  }
}

export default EmployeeFilter;

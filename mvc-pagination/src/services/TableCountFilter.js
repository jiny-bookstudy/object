import { clearElement } from '../view/DOMHandler.js';

class TableCountFilter {
  #filters = [
    {
      name: '5개씩',
      value: 5
    },
    {
      name: '15개씩',
      value: 15
    }
  ];
  #count = 5;
  #dropdownBuilder = null;
  #parentElement = null;
  #listeners = [];

  constructor(dropdownBuilder, parentElement) {
    this.#dropdownBuilder = dropdownBuilder;
    this.#parentElement = parentElement;
  }

  get count() {
    return this.#count;
  }

  #changeCount(count) {
    this.#count = count;
    this.#listeners.forEach((listener) => listener(this.#count));
  }

  #createDropdownItems() {
    return this.#filters.map((filter) => ({
      content: filter.name,
      value: filter.value
    }));
  }

  render() {
    clearElement(this.#parentElement);
    const $dropdown = this.#dropdownBuilder.createDropdown(this.#createDropdownItems());
    this.#parentElement.appendChild($dropdown);
    this.#dropdownBuilder.addEventListener('change', (e) => this.#changeCount(e.target.value));
  }

  onChangeCount(listener) {
    this.#listeners.push(listener);
  }
}

export default TableCountFilter;

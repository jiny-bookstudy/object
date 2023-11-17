import { createElement, createFragment } from '../DOMHandler.js';
import addEvent from '../addEvent.js';

class DropdownBuilder {
  #id = '';
  #name = '';
  #dropdown = null;

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  static attachLabel($dropdown) {
    const $label = createElement('label');
    $label.setAttribute('for', $dropdown.id);
    $dropdown.before($label);
  }

  #setDropdown($dropdown) {
    this.#dropdown = $dropdown;
  }

  #createDropdownContainer() {
    const $dropdown = createElement('select');
    if (this.#id) {
      $dropdown.setAttribute('id', this.#id);
    }

    if (this.#name) {
      $dropdown.setAttribute('name', this.#name);
    }

    return $dropdown;
  }

  createDropdown(options) {
    const $dropdown = this.#createDropdownContainer();
    const $optionFragment = createFragment();

    options.forEach((option) => {
      const $option = createElement('option');
      $option.textContent = option.content;
      $option.value = option.value;
      $optionFragment.appendChild($option);
    });
    $dropdown.appendChild($optionFragment);
    this.#setDropdown($dropdown);
    return $dropdown;
  }

  addEventListener(eventType, callback) {
    addEvent(this.#dropdown, eventType, callback);
  }
}

export default DropdownBuilder;

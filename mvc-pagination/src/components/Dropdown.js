import { createElement, createFragment } from '../utils/DOMHandlers.js';
import { addEvent } from '../utils/eventDispatcher.js';

class Dropdown {
  #id = null;
  #name = null;
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

  #setAttributeId($dropdown, id) {
    $dropdown.setAttribute('id', id);
  }

  #setAttributeName($dropdown, name) {
    $dropdown.setAttribute('name', name);
  }

  #setDropdown($dropdown) {
    this.#dropdown = $dropdown;
  }

  #createDropdown(id, name) {
    const $dropdown = createElement('select');

    if (id) {
      this.#setAttributeId($dropdown, id);
    }
    if (name) {
      this.#setAttributeName($dropdown, name);
    }

    return $dropdown;
  }

  #createOptions(options) {
    const $options = createFragment();
    options.forEach((option) => {
      const $option = createElement('option');
      $option.textContent = option.content;
      $option.value = option.value;
      $options.appendChild($option);
    });

    return $options;
  }

  create(options) {
    const $dropdown = this.#createDropdown(this.#id, this.#name);
    const $options = this.#createOptions(options);
    $dropdown.appendChild($options);
    this.#setDropdown($dropdown);
    return $dropdown;
  }

  attachEvent(event, listener) {
    addEvent(this.#dropdown, event, listener);
  }
}

export default Dropdown;

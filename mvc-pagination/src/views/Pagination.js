import { clearElement, createElement, createFragment, getQuerySelector } from '../utils/DOMHandlers.js';
import { PAGINATION_CONTAINER_ID } from '../constants/elements.js';
import { addEvent } from '../utils/eventDispatcher.js';

class Pagination {
  #ACTIVE_CLASS = 'active';
  #NEXT_DIRECTION = 'next';
  #PREV_DIRECTION = 'prev';
  #NEXT_PAGE_BUTTON_MARKUP = '>>';
  #PREV_PAGE_BUTTON_MARKUP = '<<';
  #currentPage = 1;
  #perPage = 5;
  #totalCount = 0;
  #container = null;
  #listeners = [];

  constructor(totalCount, perPage) {
    this.#perPage = perPage;
    this.#totalCount = totalCount;
    this.#container = getQuerySelector(`#${PAGINATION_CONTAINER_ID}`);
  }

  get currentPage() {
    return this.#currentPage;
  }

  get perPage() {
    return this.#perPage;
  }

  #reset($element) {
    clearElement($element);
  }

  #updateCurrentPage(pageNumber) {
    this.#currentPage = pageNumber;
    const range = this.#calculateStartAndEndPage(this.#perPage, pageNumber);
    this.#notifyEventListeners(range);
  }

  #calculateStartAndEndPage(perPage, currentPage) {
    const start = perPage * (currentPage - 1) + 1;
    const end = Number(start) + Number(this.#perPage - 1);
    return { start, end };
  }

  #calculatePageLength(totalCount, perPage) {
    return Math.ceil(totalCount / perPage);
  }

  #getStartIndex(currentPage, perPage) {
    return currentPage - (currentPage % perPage || perPage) + 1;
  }

  #getEndIndex(startIndex, perPage, pageLength) {
    const potentialEndIndex = startIndex + perPage - 1;
    return potentialEndIndex > pageLength ? pageLength : potentialEndIndex;
  }

  #notifyEventListeners(range) {
    this.#listeners.forEach((listener) => listener(range));
  }

  #changePage(pageNumber) {
    if (pageNumber !== this.#currentPage) {
      this.#updateCurrentPage(pageNumber);
      this.render();
    }
  }

  #decreasePage(currentPage) {
    if (currentPage > 1) {
      this.#changePage(currentPage - 1);
    }
  }

  #increasePage(currentPage) {
    if (currentPage !== this.#calculatePageLength(this.#totalCount, this.#perPage)) {
      this.#changePage(this.#currentPage + 1);
    }
  }

  #createPaginationRage() {
    const pageLength = this.#calculatePageLength(this.#totalCount, this.#perPage);
    const startIndex = this.#getStartIndex(this.#currentPage, this.#perPage);
    const endIndex = this.#getEndIndex(startIndex, this.#perPage, pageLength);

    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => ({
      pageNumber: startIndex + index,
      active: startIndex + index === this.#currentPage
    }));
  }

  #createArrowButton(direction) {
    const $li = createElement('li');
    const $button = createElement('button');
    $button.setAttribute('type', 'button');
    $button.classList.add('arrow');
    $button.setAttribute('data-arrow-direction', direction);
    $button.textContent =
      direction === this.#NEXT_DIRECTION ? this.#NEXT_PAGE_BUTTON_MARKUP : this.#PREV_PAGE_BUTTON_MARKUP;
    this.#attachArrowClickEvent($button, direction);
    $li.appendChild($button);
    return $li;
  }

  #createPageButton(pageNumber, active) {
    const $button = createElement('button');
    $button.textContent = pageNumber;
    $button.setAttribute('type', 'button');
    $button.setAttribute('data-page', pageNumber);
    if (active) {
      $button.classList.add(this.#ACTIVE_CLASS);
    }

    this.#attachPageNumberClickEvent($button, pageNumber);
    return $button;
  }

  #createPaginationList(range) {
    const $orderedList = createElement('ol');
    const $fragment = createFragment();
    range.forEach(({ pageNumber, active }) => {
      const $list = createElement('li');
      const $pageButton = this.#createPageButton(pageNumber, active);
      $list.appendChild($pageButton);
      $fragment.appendChild($list);
    });
    const $prevPageButton = this.#createArrowButton(this.#PREV_DIRECTION);
    const $nextPageButton = this.#createArrowButton(this.#NEXT_DIRECTION);
    $orderedList.prepend($prevPageButton);
    $orderedList.append($fragment, $nextPageButton);
    return $orderedList;
  }

  #attachArrowClickEvent($element, type) {
    const currentPage = this.#currentPage;
    if (type === this.#NEXT_DIRECTION) {
      addEvent($element, 'click', () => {
        this.#increasePage(currentPage);
      });
      return;
    }
    addEvent($element, 'click', () => {
      this.#decreasePage(currentPage);
    });
  }

  #attachPageNumberClickEvent($element, pageNumber) {
    addEvent($element, 'click', () => this.#changePage(pageNumber));
  }

  setPerPage(perPage) {
    this.#perPage = perPage;
  }

  setCurrentPage(currentPage) {
    this.#currentPage = currentPage;
  }

  bindChangePage(listener) {
    this.#listeners.push(listener);
  }

  render() {
    this.#reset(this.#container);
    const range = this.#createPaginationRage();
    const $paginationList = this.#createPaginationList(range);
    this.#container.appendChild($paginationList);
  }
}

export default Pagination;

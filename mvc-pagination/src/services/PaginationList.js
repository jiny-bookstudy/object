import { clearElement, createElement, createFragment } from '../view/DOMHandler.js';
import addEvent from '../view/addEvent.js';

class PaginationList {
  #activeClass = 'active';
  #currentPage = 1;
  #perPage = 5;
  #totalCount = 0;
  #parentElement = null;
  #listeners = [];

  constructor(totalCount, perPage, parentElement) {
    this.#perPage = perPage;
    this.#totalCount = totalCount;
    this.#parentElement = parentElement;
  }

  get currentPage() {
    return this.#currentPage;
  }

  get perPage() {
    return this.#perPage;
  }

  #changePage(pageNumber) {
    const offset = this.#perPage * (pageNumber - 1) + 1;
    const limit = Number(offset) + Number(this.#perPage - 1);
    this.#currentPage = pageNumber;
    this.#listeners.forEach((listener) =>
      listener({
        offset,
        limit
      })
    );
  }

  #decreasePage() {
    if (this.#currentPage === 1) {
      return;
    }
    this.#changePage(this.#currentPage - 1);
  }

  #increasePage() {
    if (this.#currentPage === Math.ceil(this.#totalCount / this.#perPage)) {
      return;
    }
    this.#changePage(this.#currentPage + 1);
  }

  #getPagingList() {
    const pageLength = Math.ceil(this.#totalCount / this.#perPage);
    const startIndex = this.#currentPage - (this.#currentPage % this.#perPage || this.#currentPage) + 1;
    const endIndex = startIndex + this.#perPage - 1 > pageLength ? pageLength : startIndex + this.#perPage - 1;
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
    $button.textContent = direction === 'next' ? '>>' : '<<';
    addEvent($button, 'click', () => {
      if (direction === 'next') {
        this.#increasePage();
        return;
      }
      this.#decreasePage();
    });
    $li.appendChild($button);
    return $li;
  }

  #createPageButton(pageNumber, active) {
    const $button = createElement('button');
    $button.textContent = pageNumber;
    $button.setAttribute('type', 'button');
    $button.setAttribute('data-page', pageNumber);
    if (active) {
      $button.classList.add(this.#activeClass);
    }

    addEvent($button, 'click', () => {
      this.#changePage(pageNumber);
    });
    return $button;
  }

  #createPageList(pageList) {
    const $orderedList = createElement('ol');
    const $fragment = createFragment();
    pageList.forEach(({ pageNumber, active }) => {
      const $list = createElement('li');
      const $pageButton = this.#createPageButton(pageNumber, active);
      $list.appendChild($pageButton);
      $fragment.appendChild($list);
    });
    const $prevPageButton = this.#createArrowButton('prev');
    const $nextPageButton = this.#createArrowButton('next');
    $orderedList.prepend($prevPageButton);
    $orderedList.append($fragment, $nextPageButton);
    return $orderedList;
  }

  render() {
    clearElement(this.#parentElement);
    const pageList = this.#getPagingList();
    const $pageList = this.#createPageList(pageList);
    this.#parentElement.appendChild($pageList);
  }

  setPerPage(perPage) {
    this.#perPage = perPage;
  }

  setCurrentPage(currentPage) {
    this.#currentPage = currentPage;
  }

  onChangePage(listener) {
    this.#listeners.push(listener);
  }
}

export default PaginationList;

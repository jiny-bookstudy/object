import { createElement } from '../utils/DOMHandlers.js';

class Table {
  #id = null;
  #headings = [];
  #rows = [];

  constructor(id) {
    this.#id = id;
  }

  #setAttributeId($table, id) {
    $table.setAttribute('id', id);
  }

  #createCell({ textContent, cellType = 'td', scope = 'col', row = 1, col = 1 }) {
    const $cell = createElement(cellType);
    $cell.textContent = textContent;
    $cell.setAttribute('rowspan', row);
    $cell.setAttribute('colspan', col);
    $cell.setAttribute('scope', scope);
    return $cell;
  }

  #createRowCells($tableRow, rowData) {
    Object.entries(rowData).forEach(([key, value]) => {
      if (Object.hasOwn(rowData, key)) {
        const $tableCell = this.#createCell(value);
        $tableRow.appendChild($tableCell);
      }
    });
  }

  #createHeader(headings) {
    const $tableHeader = createElement('thead');
    const $tr = createElement('tr');

    headings.forEach(($heading) => {
      $tr.appendChild(this.#createCell({ cellType: 'th', ...$heading }));
    });

    $tableHeader.appendChild($tr);
    return $tableHeader;
  }

  #createBody(rows) {
    const $tableBody = createElement('tbody');

    rows.forEach((row) => {
      const $tableRow = createElement('tr');
      this.#createRowCells($tableRow, row);
      $tableBody.appendChild($tableRow);
    });

    return $tableBody;
  }

  create(headings, rows) {
    const $table = createElement('table');
    const $tableHeader = this.#createHeader(headings);
    const $tableBody = this.#createBody(rows);
    $table.append($tableHeader, $tableBody);
    this.#setAttributeId($table, this.#id);
    return $table;
  }
}

export default Table;

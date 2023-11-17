import { clearElement, createElement } from '../view/DOMHandler.js';

class EmployeeTable {
  #tableHeaderList = ['name', 'title', 'email', 'role'];
  #tableHeaderAttribute = {
    scope: 'col',
    row: 1,
    col: 1
  };
  #tableBodyAttribute = {
    row: 1,
    col: 1,
    cellType: 'td'
  };
  #parentElement = null;
  #tableBuilder = null;
  #employeeList = [];

  constructor(tableBuilder, employeeList, parentElement) {
    this.#tableBuilder = tableBuilder;
    this.#employeeList = employeeList;
    this.#parentElement = parentElement;
  }

  #createTableHeaderItems() {
    const tableHeaderItems = this.#tableHeaderList.map((header) => ({
      textContent: header,
      ...this.#tableHeaderAttribute
    }));
    return tableHeaderItems;
  }

  #createTableBodyItems() {
    return this.#employeeList.map((employee) => {
      const item = {};
      this.#tableHeaderList.forEach((prop) => {
        item[prop] = {
          textContent: employee[prop],
          ...this.#tableBodyAttribute
        };
      });
      return item;
    });
  }

  setEmployeeList(employeeList) {
    this.#employeeList = employeeList;
  }

  render() {
    clearElement(this.#parentElement);
    const headerList = this.#createTableHeaderItems();
    const bodyList = this.#createTableBodyItems();
    const $table = createElement('table');
    const $tableHeader = this.#tableBuilder.createTableHeader(headerList);
    const $tableBody = this.#tableBuilder.createTableBody(bodyList);
    $table.append($tableHeader, $tableBody);
    this.#parentElement.appendChild($table);
  }
}

export default EmployeeTable;

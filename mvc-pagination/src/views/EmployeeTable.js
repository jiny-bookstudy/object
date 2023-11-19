import { clearElement, getQuerySelector } from '../utils/DOMHandlers.js';
import { EMPLOYEE_TABLE_CONTAINER_ID } from '../constants/elements.js';

class EmployeeTable {
  #headers = ['name', 'title', 'email', 'role'];
  #headerAttributes = {
    scope: 'col',
    row: 1,
    col: 1
  };

  #bodyAttributes = {
    row: 1,
    col: 1,
    cellType: 'td'
  };
  #builder = null;
  #container = null;
  #employees = [];

  constructor(employees, tableBuilder) {
    this.#employees = employees;
    this.#builder = tableBuilder;
    this.#container = getQuerySelector(`#${EMPLOYEE_TABLE_CONTAINER_ID}`);
  }

  #reset($element) {
    clearElement($element);
  }

  #createHeaders(headers) {
    return headers.map((header) => ({
      textContent: header,
      ...this.#headerAttributes
    }));
  }

  #createBody(employees) {
    return employees.map((employee) => {
      const item = {};
      this.#headers.forEach((prop) => {
        item[prop] = {
          textContent: employee[prop],
          ...this.#bodyAttributes
        };
      });
      return item;
    });
  }

  render() {
    this.#reset(this.#container);
    const employeeHeader = this.#createHeaders(this.#headers);
    const employeeRows = this.#createBody(this.#employees);
    const $table = this.#builder.create(employeeHeader, employeeRows);
    this.#container.appendChild($table);
  }
}

export default EmployeeTable;

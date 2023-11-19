import { DEFAULT_PAGE_SIZE } from '../constants/elements.js';
import Employees from '../models/Employees.js';
import EmployeeFilter from '../views/EmployeeFilter.js';
import EmployeeTable from '../views/EmployeeTable.js';
import Pagination from '../views/Pagination.js';

class WebController {
  #limit = DEFAULT_PAGE_SIZE;
  #offset = 1;
  #dropdownBuilder = null;
  #tableBuilder = null;
  #employees = null;

  constructor(employees, dropdownBuilder, tableBuilder) {
    this.#employees = new Employees(employees);
    this.#dropdownBuilder = dropdownBuilder;
    this.#tableBuilder = tableBuilder;
  }

  #setOffset(offset) {
    this.#offset = offset;
  }

  #setLimit(limit) {
    this.#limit = limit;
  }

  #changeCount(count) {
    const numericCount = Number(count);
    this.#setOffset(1);
    this.#setLimit(numericCount);
    this.renderTable();
    this.renderPagination(numericCount);
  }

  #clickPagination({ start, end }) {
    this.#setOffset(start);
    this.#setLimit(end);
    this.renderTable();
  }

  #getEmployeesByRange(offset, limit) {
    return this.#employees.getEmployeesByRange(offset, limit);
  }

  renderTable() {
    const employees = this.#getEmployeesByRange(this.#offset, this.#limit);
    const employeeTable = new EmployeeTable(employees, this.#tableBuilder);
    employeeTable.render();
  }

  renderDropdown() {
    const employeeFilter = new EmployeeFilter(this.#dropdownBuilder);
    employeeFilter.bindChangeCount(this.#changeCount.bind(this));
    employeeFilter.render();
  }

  renderPagination(perPage = 5) {
    const pagination = new Pagination(this.#employees.length, perPage);
    pagination.bindChangePage(this.#clickPagination.bind(this));
    pagination.render();
  }
}

export default WebController;

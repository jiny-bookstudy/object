import './assets/css/index.css';
import {
  DROPDOWN_ID,
  DROPDOWN_NAME,
  DROPDOWN_CONTAINER_ID,
  EMPLOYEE_TABLE_CONTAINER_ID,
  PAGINATION_CONTAINER_ID,
  DEFAULT_PAGE_SIZE
} from './constants/elements.js';
import requestEmployee from './api/employeeApi.js';
import { getQuerySelector } from './view/DOMHandler.js';
import TableBuilder from './view/components/TableBuilder.js';
import DropdownBuilder from './view/components/DropdownBuilder.js';
import EmployeeTable from './services/EmployeeTable.js';
import TableCountFilter from './services/TableCountFilter.js';
import PaginationList from './services/PaginationList.js';

const dropdownBuilder = new DropdownBuilder(DROPDOWN_ID, DROPDOWN_NAME);
const tableBuilder = new TableBuilder();

const renderApp = async () => {
  try {
    const employeesData = await requestEmployee(1, 5);
    const $tableContainer = getQuerySelector(`#${EMPLOYEE_TABLE_CONTAINER_ID}`);
    const $dropdownContainer = getQuerySelector(`#${DROPDOWN_CONTAINER_ID}`);
    const $paginationContainer = getQuerySelector(`#${PAGINATION_CONTAINER_ID}`);
    const employeeTable = new EmployeeTable(tableBuilder, employeesData.employees, $tableContainer);
    const paginationList = new PaginationList(employeesData.totalCount, DEFAULT_PAGE_SIZE, $paginationContainer);
    const tableCountFilter = new TableCountFilter(dropdownBuilder, $dropdownContainer);

    tableCountFilter.onChangeCount(async (count) => {
      const { employees } = await requestEmployee(1, count);
      employeeTable.setEmployeeList(employees);
      employeeTable.render();
      paginationList.setPerPage(Number(count));
      paginationList.setCurrentPage(1);
      paginationList.render();
    });

    paginationList.onChangePage(async ({ offset, limit }) => {
      const { employees } = await requestEmployee(offset, limit);
      employeeTable.setEmployeeList(employees);
      employeeTable.render();
      paginationList.setPerPage(tableCountFilter.count);
      paginationList.render();
    });

    tableCountFilter.render();
    paginationList.render();
    employeeTable.render();
  } catch (error) {
    console.error(error);
  }
};

renderApp();

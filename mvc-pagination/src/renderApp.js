import { DROPDOWN_ID, DROPDOWN_NAME, EMPLOYEE_TABLE_ID } from './constants/elements.js';
import { requestEmployee } from './api/employeeApi.js';
import TableBuilder from './components/Table.js';
import DropdownBuilder from './components/Dropdown.js';
import Controller from './controllers/WebController.js';

export const renderApp = async () => {
  try {
    const employees = await requestEmployee();
    const dropdownBuilder = new DropdownBuilder(DROPDOWN_ID, DROPDOWN_NAME);
    const tableBuilder = new TableBuilder(EMPLOYEE_TABLE_ID);
    const webController = new Controller(employees, dropdownBuilder, tableBuilder);

    webController.renderTable();
    webController.renderDropdown();
    webController.renderPagination();
  } catch (error) {
    console.error(error);
  }
};

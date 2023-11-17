(function () {
  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    const { insertAt } = ref;

    if (!css || typeof document === 'undefined') {
      return;
    }

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  const css_248z =
    ':root {\n  --color-table-header: #d3d3d3;\n  --color-table-even-rows: #d3d3d3;\n  --color-active: red;\n}\n\nbody {\n  padding: 50px 50px;\n  background-color: #f2f2f2;\n}\n\n#page_title {\n  margin: 20px 0;\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\ntable {\n  border-collapse: collapse;\n  width: 100%;\n  background-color: white;\n}\n\nthead {\n  background-color: var(--color-table-header);\n  font-weight: bold;\n}\n\ntr:nth-child(even) {\n  background-color: var(--color-table-even-rows);\n}\n\nth,\ntd {\n  border: 1px solid #dddddd;\n  padding: 8px;\n  text-align: center;\n}\n\n.area {\n  margin: 10px 0;\n}\n\n#dropdown {\n  display: flex;\n  justify-content: flex-end;\n}\n\n#table {\n  padding: 10px 0;\n  font-size: 1rem;\n}\n\n#pagination {\n  padding: 10px 10px;\n  text-align: center;\n  background-color: white;\n}\n\n#pagination button {\n  margin: 0 10px;\n  font-size: 1rem;\n  font-weight: 550;\n  border: 0;\n  background-color: white;\n  cursor: pointer;\n}\n\nbutton.arrow {\n  color: var(--color-active);\n}\n\nbutton.active {\n  color: var(--color-active);\n}\n\nol {\n  display: flex;\n  justify-content: center;\n  list-style: none;\n}\n';
  styleInject(css_248z);

  /** Table */
  const EMPLOYEE_TABLE_CONTAINER_ID = 'table';

  /** Dropdown */
  const DROPDOWN_CONTAINER_ID = 'dropdown';
  const DROPDOWN_ID = 'item-count-dropdown';
  const DROPDOWN_NAME = 'item-count-dropdown';

  /** Pagination */
  const PAGINATION_CONTAINER_ID = 'pagination';
  const DEFAULT_PAGE_SIZE = 5;

  class FetchApi {
    #baseUrl = '';

    constructor(baseUrl) {
      this.#baseUrl = baseUrl;
    }

    async get(url = '') {
      const requestUrl = `${this.#baseUrl}${url}`;
      const responseData = await fetch(requestUrl).then((response) => response.json());
      return responseData;
    }
  }

  const sliceArray = (targetArray, start, end) => targetArray.slice(start - 1, end);

  const requestEmployee = async (offset, limit) => {
    try {
      const employeeApi = new FetchApi('/constants/DUMMY_EMPLOYEE.json');
      const employees = await employeeApi.get();
      return {
        totalCount: employees.length,
        employees: sliceArray(employees, offset, limit)
      };
    } catch (error) {
      console.error(error);
    }
  };

  const getQuerySelector = (selector) => document.querySelector(selector);
  const createElement = (element) => document.createElement(element);
  const createFragment = () => document.createDocumentFragment();
  const clearElement = (element) => element.replaceChildren();

  class TableBuilder {
    #createCell({ textContent, cellType = 'td', scope = 'col', row = 1, col = 1 }) {
      const $tableCell = createElement(cellType);
      $tableCell.textContent = textContent;
      $tableCell.setAttribute('rowspan', row);
      $tableCell.setAttribute('colspan', col);
      $tableCell.setAttribute('scope', scope);
      return $tableCell;
    }

    createTableHeader(headerList) {
      const $thead = createElement('thead');
      const $tr = createElement('tr');

      headerList.forEach((header) => {
        $tr.appendChild(this.#createCell({ cellType: 'th', ...header }));
      });

      $thead.appendChild($tr);
      return $thead;
    }

    createTableBody(list) {
      const $tbody = createElement('tbody');
      const $trFragment = createFragment();

      list.forEach((rows) => {
        const $tableCellFragment = document.createDocumentFragment();
        const $tr = createElement('tr');

        for (const rowItem in rows) {
          if (Object.hasOwn(rows, rowItem)) {
            const $tableCell = this.#createCell(rows[rowItem]);
            $tableCellFragment.appendChild($tableCell);
          }
        }
        $tr.appendChild($tableCellFragment);
        $trFragment.appendChild($tr);
      });

      $tbody.appendChild($trFragment);
      return $tbody;
    }
  }

  const addEvent = ($target, eventType, event) => {
    $target.addEventListener(eventType, event);
  };

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

  class TableCountFilter {
    #filters = [
      {
        name: '5개씩',
        value: 5
      },
      {
        name: '15개씩',
        value: 15
      }
    ];
    #count = 5;
    #dropdownBuilder = null;
    #parentElement = null;
    #listeners = [];

    constructor(dropdownBuilder, parentElement) {
      this.#dropdownBuilder = dropdownBuilder;
      this.#parentElement = parentElement;
    }

    get count() {
      return this.#count;
    }

    #changeCount(count) {
      this.#count = count;
      this.#listeners.forEach((listener) => listener(this.#count));
    }

    #createDropdownItems() {
      return this.#filters.map((filter) => ({
        content: filter.name,
        value: filter.value
      }));
    }

    render() {
      clearElement(this.#parentElement);
      const $dropdown = this.#dropdownBuilder.createDropdown(this.#createDropdownItems());
      this.#parentElement.appendChild($dropdown);
      this.#dropdownBuilder.addEventListener('change', (e) => this.#changeCount(e.target.value));
    }

    onChangeCount(listener) {
      this.#listeners.push(listener);
    }
  }

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
})();
// # sourceMappingURL=bundle.js.map

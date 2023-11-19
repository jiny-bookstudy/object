import { sliceArray } from '../utils/array.js';

class Employees {
  #employees = [];

  constructor(employees) {
    this.#employees = employees;
  }

  get length() {
    return this.#employees.length;
  }

  getEmployeesByRange(offset, limit) {
    return sliceArray(this.#employees, offset, limit);
  }

  getTotalLength() {
    return this.#employees.length;
  }
}

export default Employees;

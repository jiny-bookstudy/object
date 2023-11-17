import FetchApi from './config/FetchApi.js';
import sliceArray from '../utils/array.js';

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

export default requestEmployee;

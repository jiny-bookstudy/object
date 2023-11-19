import FetchController from '../controllers/FetchController.js';

export const requestEmployee = async () => {
  try {
    const employeeApi = new FetchController('/constants/DUMMY_EMPLOYEE.json');
    const employees = await employeeApi.get();
    return employees;
  } catch (error) {
    throw new Error(error);
  }
};

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

// Income APIs
export const getIncomes = () => API.get('/get-incomes');
export const addIncome = (data) => API.post('/add-income', data);
export const deleteIncome = (id) => API.delete(`/delete-income/${id}`);

// Expense APIs
export const getExpenses = () => API.get('/get-expenses');
export const addExpense = (data) => API.post('/add-expense', data);
export const deleteExpense = (id) => API.delete(`/delete-expense/${id}`);


export const deleteTransaction = (id, type) => {
    const endpoint = type === 'income' ? 'delete-income' : 'delete-expense';
    return API.delete(`/${endpoint}/${id}`);
  };


export const updateIncome = async (id, incomeData) => {
  const response = await API.put(`/update-income/${id}`, incomeData);
  console.log(response)
  return response.data; // Axios automatically parses the response data
};

  
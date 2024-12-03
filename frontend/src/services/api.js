import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

// Income APIs
export const getIncomes = () => API.get('/get-incomes');
export const addIncome = (data) => API.post('/income/add', data);

// Expense APIs
export const getExpenses = () => API.get('/get-incomes');
export const addExpense = (data) => API.post('/expense/add', data);

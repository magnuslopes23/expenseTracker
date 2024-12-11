import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewTransactions from '../components/ViewTransactions';
import { getIncomes, getExpenses } from '../services/api';

jest.mock('../services/api');

const mockIncomes = [
  { _id: '1', title: 'Salary', date: '2024-12-01', category: 'Job', description: 'Monthly Salary', amount: 3000, type: 'income' },
];
const mockExpenses = [
  { _id: '2', title: 'Groceries', date: '2024-12-02', category: 'Food', description: 'Weekly Groceries', amount: 150, type: 'expense' },
];

test('displays transactions after fetching', async () => {

  getIncomes.mockResolvedValueOnce({ data: mockIncomes });
  getExpenses.mockResolvedValueOnce({ data: mockExpenses });

 
  render(<ViewTransactions type="all" />);

  await waitFor(() => {
    const salaryTransaction = screen.getByText('Salary', { selector: 'h3.transaction-title' });
    const groceriesTransaction = screen.getByText('Groceries', { selector: 'h3.transaction-title' });
    expect(salaryTransaction).toBeInTheDocument();
    expect(groceriesTransaction).toBeInTheDocument();
  });
});

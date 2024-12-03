import React, { useState, useEffect } from 'react';
import { getIncomes, getExpenses } from '../services/api';
import '../styles/ViewTransactions.css';

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch both incomes and expenses concurrently
        const [incomeResponse, expenseResponse] = await Promise.all([
          getIncomes(),
          getExpenses(),
        ]);

        // Combine incomes and expenses into one list
        const combinedTransactions = [
          ...incomeResponse.data.map((item) => ({ ...item, type: 'income' })),
          ...expenseResponse.data.map((item) => ({ ...item, type: 'expense' })),
        ];

        // Sort by date (newest first)
        combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(combinedTransactions);
        setLoading(false);
      } catch (err) {
        setError('Error fetching transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="view-transactions">
      <h2>All Transactions</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}
      <ul className="transactions-list">
        {transactions.map((tx) => (
          <li key={tx._id} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-title">{tx.title}</span>
              <span className="transaction-date">{new Date(tx.date).toLocaleDateString()}</span>
              <span className={`transaction-type ${tx.type}`}>{tx.type}</span>
            </div>
            <span
              className={`transaction-amount ${
                tx.type === 'income' ? 'positive' : 'negative'
              }`}
            >
              {tx.type === 'income' ? `+${tx.amount}` : `-${tx.amount}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTransactions;

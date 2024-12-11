import React, { useState, useEffect } from 'react';
import { getIncomes, getExpenses, deleteTransaction } from '../services/api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faTags,
  faCommentAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import '../styles/ViewTransactions.css';

const ViewTransactions = ({ type = 'all', refresh, onTransactionClick }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let incomes = [];
        let expenses = [];

        if (type === 'income' || type === 'all') {
          const incomeResponse = await getIncomes();
          incomes = incomeResponse.data.map((item) => ({
            ...item,
            type: 'income',
          }));
        }

        if (type === 'expense' || type === 'all') {
          const expenseResponse = await getExpenses();
          expenses = expenseResponse.data.map((item) => ({
            ...item,
            type: 'expense',
          }));
        }

        const combinedTransactions = [...incomes, ...expenses];
        combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(combinedTransactions);
        setLoading(false);
      } catch (err) {
        setError('Error fetching transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [type, refresh]);

  const handleTransactionClick = (transaction) => {
    if (onTransactionClick) {
      onTransactionClick(transaction);
    }
  };

  const handleDelete = async (id, transactionType) => {
    try {
      await deleteTransaction(id, transactionType);
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <div className="view-transactions">
      <h2>
        {type === 'income' && 'Incomes'}
        {type === 'expense' && 'Expenses'}
        {type === 'all' && 'All Transactions'}
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && transactions.length === 0 && <p>No transactions found.</p>}
      <ul className="transactions-list">
  {transactions.map((tx) => (
    <li key={tx._id} className="transaction-item" onClick={() => handleTransactionClick(tx)}>
      <button
        onClick={() => handleDelete(tx._id, tx.type)}
        className="delete-button"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <div className="transaction-details">
        <h3 className="transaction-title">{tx.title}</h3>
        <div className="transaction-meta">
          <span>
            <FontAwesomeIcon icon={faCalendarAlt} />{' '}
            {new Date(tx.date).toLocaleDateString()}
          </span>
          <span>
            <FontAwesomeIcon icon={faTags} /> {tx.category}
          </span>
          <span>
            <FontAwesomeIcon icon={faCommentAlt} /> {tx.description}
          </span>
        </div>
      </div>
      <div className={`transaction-amount ${tx.type}`}>
        {tx.type === 'income' ? `+${tx.amount}` : `-${tx.amount}`}
      </div>
    </li>
  ))}
</ul>



    </div>
  );
};

export default ViewTransactions;

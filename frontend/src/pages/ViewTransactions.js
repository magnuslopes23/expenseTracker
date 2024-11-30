import React from 'react';
import '../styles/ViewTransactions.css';

const ViewTransactions = () => {
  // Sample transaction data (you can replace this with an API call)
  const transactions = [
    { description: 'Dentist Appointment', amount: -120, date: '2023-11-01' },
    { description: 'Travelling', amount: -3000, date: '2023-11-02' },
    { description: 'From Freelance', amount: 1300, date: '2023-11-03' },
    { description: 'Shopping', amount: -450, date: '2023-11-04' },
    { description: 'Salary', amount: 5000, date: '2023-11-05' },
    { description: 'Electricity Bill', amount: -300, date: '2023-11-06' },
    { description: 'Gym Membership', amount: -100, date: '2023-11-07' },
    { description: 'Bonus', amount: 2000, date: '2023-11-08' },
  ];

  return (
    <div className="view-transactions">
      <h2 className="view-transactions-title">All Transactions</h2>
      <ul className="transactions-list">
        {transactions.map((tx, index) => (
          <li key={index} className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-description">{tx.description}</span>
              <span className="transaction-date">{tx.date}</span>
            </div>
            <span
              className={`transaction-amount ${
                tx.amount > 0 ? 'positive' : 'negative'
              }`}
            >
              {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTransactions;

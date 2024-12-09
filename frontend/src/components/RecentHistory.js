import React from 'react';
import '../styles/RecentHistory.css'; 
import { useNavigate } from 'react-router-dom';


const RecentHistory = () => {
  const navigate = useNavigate();

  
  const transactions = [
    { description: 'Dentist Appointment', amount: -120 },
    { description: 'Travelling', amount: -3000 },
    { description: 'From Freelance', amount: 1300 },
    { description: 'Shopping', amount: -450 },
    { description: 'Salary', amount: 5000 },
    { description: 'Electricity Bill', amount: -300 },
    { description: 'Gym Membership', amount: -100 },
    { description: 'Bonus', amount: 2000 },
  ];

  
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="recent-history">
      <h4 className="recent-history-title">Recent History</h4>
      <ul className="recent-history-list">
        {recentTransactions.map((tx, index) => (
          <li key={index} className="recent-history-item">
            <span className="recent-history-description">{tx.description}</span>
            <span
              className={`recent-history-amount ${
                tx.amount > 0 ? 'positive' : 'negative'
              }`}
            >
              {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="view-more-button"
        onClick={() => navigate('/view-transactions')}
      >
        View More
      </button>
    </div>
  );
};

export default RecentHistory;

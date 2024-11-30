import React from 'react';
import '../styles//Summary.css';

const Summary = () => {
  return (
    <div className="summary">
      <div className="summary-item">
        <h4>Total Income</h4>
        <p>$16,500</p>
      </div>
      <div className="summary-item">
        <h4>Total Expenses</h4>
        <p>$3,920</p>
      </div>
      <div className="summary-item">
        <h4>Total Balance</h4>
        <p>$12,580</p>
      </div>
    </div>
  );
};

export default Summary;

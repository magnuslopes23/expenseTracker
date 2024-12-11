import React from 'react';
import ViewTransactions from '../components/ViewTransactions.js';
// import '../styles/ViewTransactionsPage.css';

const ViewTransactionsPage = () => {
  return (
    <div className="view-transactions-page">
      <ViewTransactions type="all" />
    </div>
  );
};

export default ViewTransactionsPage;

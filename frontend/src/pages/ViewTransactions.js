import React, { useState, useEffect } from "react";
import { getIncomes, getExpenses } from "../services/api";
import { deleteIncome, deleteExpense } from "../services/api";
import "../styles/ViewTransactions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCalendarAlt, faCommentAlt, faWallet, faTags} from "@fortawesome/free-solid-svg-icons";

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (id, type) => {
    try {
      if (type === "income") {
        await deleteIncome(id);
      } else if (type === "expense") {
        await deleteExpense(id);
      }
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
      alert("Transaction deleted successfully!");
    } catch (err) {
      alert("Error deleting transaction");
    }
  };

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
        combinedTransactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

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
            <div className="transaction-icon">
              <FontAwesomeIcon icon={faWallet} className={`icon-${tx.type}`} />
            </div>
            <div className="transaction-details">
              <h3 className="transaction-title">{tx.title}</h3>
              <div className="transaction-meta">
                <span>
                  <FontAwesomeIcon icon={faCalendarAlt} /> {new Date(tx.date).toLocaleDateString()}
                </span>
                <span>
                  <FontAwesomeIcon icon={faTags} /> {tx.category}
                </span>
                <span>
                  <FontAwesomeIcon icon={faCommentAlt} /> {tx.description}
                </span>
                <span>
                  <strong>Type:</strong> {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </span>
              </div>
            </div>
            <div className={`transaction-amount ${tx.type}`}>
              {tx.type === 'income' ? `+${tx.amount}` : `-${tx.amount}`}
            </div>
            <button
              onClick={() => handleDelete(tx._id, tx.type)}
              className="delete-button"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTransactions;

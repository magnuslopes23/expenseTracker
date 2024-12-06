import React, { useState } from "react";
import { addIncome, updateIncome } from "../services/api"; // Ensure `updateIncome` is available in your API file
import ViewTransactions from "../components/ViewTransactions";
import "../styles/AddIncomePage.css";

const AddIncomePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [editingId, setEditingId] = useState(null); // Store the ID of the transaction being edited
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransactionClick = (transaction) => {
    // Populate the form with the clicked transaction data
    setIsEditing(true);
    setEditingId(transaction._id);
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split("T")[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.description ||
      !formData.date
    ) {
      setMessage("All fields are required");
      return;
    }

    try {
      if (isEditing) {
        // Update existing transaction
        console.log("isediting")
        console.log("Income Data for Update:", formData);
        await updateIncome(editingId, {
          ...formData,
          amount: Number(formData.amount), // Ensure amount is a number
        });
        setMessage("Income updated successfully!");
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new transaction
        await addIncome(formData);
        setMessage("Income added successfully!");
      }
      setFormData({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
      setRefreshTransactions((prev) => !prev); // Refresh transactions
    } catch (error) {
      setMessage("Error submitting income. Please try again.");
    }
  };

  return (
    <div className="add-income-page">
      {/* Form Section */}
      <div className="form-section">
        <h2>{isEditing ? "Edit Income" : "Add Income"}</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="2"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="add-transaction-button">
            {isEditing ? "Update Income" : "+ Add Income"}
          </button>
        </form>
      </div>

      {/* Transactions Section */}
      <div className="transactions-section">
        <ViewTransactions
          type="income"
          refresh={refreshTransactions}
          onTransactionClick={handleTransactionClick}
        />
      </div>
    </div>
  );
};

export default AddIncomePage;

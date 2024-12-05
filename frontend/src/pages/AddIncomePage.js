import React, { useState } from "react";
import { addIncome } from "../services/api";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.title || !formData.amount || !formData.category || !formData.description || !formData.date) {
  //     setMessage('All fields are required');
  //     return;
  //   }

  //   try {
  //     await addIncome(formData);
  //     setMessage('Income added successfully!');
  //     setFormData({ title: '', amount: '', category: '', description: '', date: '' });
  //   } catch (error) {
  //     setMessage('Error adding income. Please try again.');
  //   }
  // };

  const [refreshTransactions, setRefreshTransactions] = useState(false); // New state for refreshing transactions

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
      await addIncome(formData);
      setMessage("Income added successfully!");
      setFormData({
        title: "",
        amount: "",
        category: "",
        description: "",
        date: "",
      });
      setRefreshTransactions((prev) => !prev); // Toggle refresh state
    } catch (error) {
      setMessage("Error adding income. Please try again.");
    }
  };

  return (
    <div className="add-income-page">
      {/* Form Section */}
      <div className="form-section">
        <h2>Add Income</h2>
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
            + Add Income
          </button>
        </form>
      </div>

      {/* Transactions Section */}
      <div className="transactions-section">
        <ViewTransactions type="income" refresh={refreshTransactions} />
      </div>
    </div>
  );
};

export default AddIncomePage;

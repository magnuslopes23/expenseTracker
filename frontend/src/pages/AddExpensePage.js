import React, { useState } from 'react';
import { addExpense } from '../services/api';

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.amount || !formData.category || !formData.description || !formData.date) {
      setMessage('All fields are required');
      return;
    }

    try {
      await addExpense(formData);
      setMessage('Expense added successfully');
      setFormData({ title: '', amount: '', category: '', description: '', date: '' });
    } catch (error) {
      setMessage('Error adding expense');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpensePage;

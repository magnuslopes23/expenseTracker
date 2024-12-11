import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import HomePage from './pages/HomePage.js';
import AddIncomePage from './pages/AddIncomePage.js';
import AddExpensePage from './pages/AddExpensePage.js';
import ViewTransactionsPage from './pages/ViewTransactionsPage.js';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-income" element={<AddIncomePage />} />
            <Route path="/add-expense" element={<AddExpensePage />} />
            <Route path="/view-transactions" element={<ViewTransactionsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

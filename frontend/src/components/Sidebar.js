import React from 'react';
import '../styles//Sidebar.css';
import profile from '../media/img/avatar.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src={profile} alt="Profile" />
        <h3>Mike</h3>
        <p>Your Money</p>
      </div>
      <ul>
        <li>Dashboard</li>
        <li>View Transactions</li>
        <li>Incomes</li>
        <li>Expenses</li>
      </ul>
    </div>
  );
};

export default Sidebar;

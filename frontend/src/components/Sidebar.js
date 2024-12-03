import React from 'react';
import '../styles/Sidebar.css';
import profile from '../media/img/avatar.png';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faList,
  faDollarSign,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src={profile} alt="Profile" />
        <h3>Hello, Mike</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FontAwesomeIcon icon={faChartLine} className="menu-icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/view-transactions"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FontAwesomeIcon icon={faList} className="menu-icon" />
            <span>View Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-income"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FontAwesomeIcon icon={faDollarSign} className="menu-icon" />
            <span>Add Incomes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-expense"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FontAwesomeIcon icon={faWallet} className="menu-icon" />
            <span>Add Expenses</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

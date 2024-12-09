import React from 'react';
import Chart from '../components/Chart';
import Summary from '../components/Summary';
import RecentHistory from '../components/RecentHistory';
import '../styles/HomePage.css'; 


const HomePage = () => {
  return (
    <div className="dashboard">
      <h2>All Transactions</h2>
      <div className="dashboard-grid">
        <div className="chart-container">
          <Chart />
        </div>
        <div>
          <RecentHistory /> {/* Removed unnecessary container */}
        </div>
      </div>
      <Summary />
    </div>
  );
};

export default HomePage;

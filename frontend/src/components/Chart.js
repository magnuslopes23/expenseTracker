import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { getIncomes, getExpenses } from '../services/api'; 


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await getIncomes();
        const expenseResponse = await getExpenses();

        const incomes = incomeResponse.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          amount: item.amount,
        }));

        const expenses = expenseResponse.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          amount: item.amount,
        }));

        
        const uniqueDates = Array.from(
          new Set([...incomes.map((i) => i.date), ...expenses.map((e) => e.date)])
        );

        
        const incomeData = uniqueDates.map((date) =>
          incomes.find((i) => i.date === date)?.amount || 0
        );
        const expenseData = uniqueDates.map((date) =>
          expenses.find((e) => e.date === date)?.amount || 0
        );

        setChartData({
          labels: uniqueDates,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 128, 0, 0.2)',
              fill: true,
            },
            {
              label: 'Expenses',
              data: expenseData,
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;

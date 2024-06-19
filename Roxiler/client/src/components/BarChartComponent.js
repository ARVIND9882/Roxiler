// src/components/BarChartComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, BarElement, BarController } from 'chart.js';
import 'chartjs-adapter-moment';
import { Bar } from 'react-chartjs-2';
import '../App.css';

Chart.register(CategoryScale, LinearScale, Title, Tooltip, BarElement, BarController);

const BarChartComponent = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/barchart/${selectedMonth}`);
        const data = response.data;

        if (!data || data.length === 0) {
          console.error('No data fetched');
          return;
        }

        const priceRanges = data.map(item => item.range);
        const counts = data.map(item => item.count);

        const chartData = {
          labels: priceRanges,
          datasets: [
            {
              label: 'Number of Items',
              data: counts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)', // Updated background color
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
            },
          ],
        };

        setChartData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bar chart data:', error.message);
      }
    };

    fetchChartData();
  }, [selectedMonth]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <h2 className="text-center mb-4">Bar Chart for {selectedMonth}</h2>
        <div className="col-lg-10">
          <div className="card">
            <div className="card-body">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : chartData.labels && chartData.labels.length > 0 ? (
                <div style={{ height: '400px' }}>
                  <Bar
                    data={chartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          type: 'category',
                          title: {
                            display: true,
                            text: 'Price Range',
                          },
                        },
                        y: {
                          type: 'linear',
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Items',
                          },
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <p className="text-center">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartComponent;

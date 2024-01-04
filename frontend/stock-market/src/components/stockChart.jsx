import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { formatDateString } from './DateInput';

const StockChart = ({ stockData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;

    if (chartRef.current && stockData) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy existing chart if it exists
      if (myChart) {
        myChart.destroy();
      }

    //   const dates = stockData.map((item) => formatDateString(item.date).reverse());
      const dates = stockData.map((item) => formatDateString(item.date)).reverse(); // Reverse the order
    
      const highs = stockData.map((item) => item.high).reverse();
      const closes = stockData.map((item) => item.close).reverse();
      const opens = stockData.map((item) => item.open).reverse();

      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'High',
              data: highs,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'Close',
              data: closes,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Open',
              data: opens,
              borderColor: 'rgba(255, 205, 86, 1)',
              backgroundColor: 'rgba(255, 205, 86, 0.2)',
            },
          ],
        },
      });
    }

    // Cleanup the chart on component unmount
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [stockData]);

  return <canvas ref={chartRef} className="py-10" />;
  

};

export default StockChart;

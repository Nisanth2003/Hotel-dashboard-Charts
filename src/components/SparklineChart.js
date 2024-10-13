import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ data, title }) => {
  const series = [{ data }];
  const options = {
    chart: { type: 'line', sparkline: { enabled: true } },
    title: { text: title },
    stroke: { curve: 'smooth' },

  };

  return <Chart options={options} series={series} type="line" height={100} />;
};

export default SparklineChart;

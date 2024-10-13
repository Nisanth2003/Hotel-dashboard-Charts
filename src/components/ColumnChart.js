import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const series = [{ name: 'Visitors', data: data.map((entry) => entry.visitors) }];
  const options = {
    chart: { type: 'bar' },
    xaxis: { categories: data.map((entry) => entry.country) , labels: { style: { colors: '#ffffff' } }},
    yaxis: {
        labels: { style: { colors: '#ffffff' } }, 
      },
    plotOptions: { bar: { dataLabels: { position: 'top' } } }
  };

  return <Chart options={options} series={series} type="bar" height={350} text-color="white" />;
};

export default ColumnChart;

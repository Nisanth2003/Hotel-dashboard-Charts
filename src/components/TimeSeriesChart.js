import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const series = [
    {
      name: 'Visitors',
      data: data.map((entry) => [new Date(entry.date).getTime(), entry.visitors])
    }
  ];

  const options = {
    chart: {
      type: 'line',
      zoom: { enabled: true }
    },
    xaxis: { type: 'datetime', labels: { style: { colors: '#ffffff' } } },
    yaxis: { title: { text: 'Number of Visitors' }, labels: { style: { colors: '#ffffff' } } }
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default TimeSeriesChart;

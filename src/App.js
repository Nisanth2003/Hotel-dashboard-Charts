import React, { useState, useEffect } from 'react';
import './App.css';
import DatePickerComponent from './components/DatePickerComponent';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';

function App() {
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [adultData, setAdultData] = useState([]);
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
   
    fetch('/hotelData.json')
      .then((response) => response.json())
      .then((data) => {
        processData(data);
      });
  }, []);

  const handleDateChange = (startDate, endDate) => {
    fetch('/hotelData.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((d) => {
          const date = new Date(
            d.arrival_date_year,
            d.arrival_date_month - 1,
            d.arrival_date_day_of_month
          );
          return date >= startDate && date <= endDate;
        });
        processData(filteredData);
      });
  };

  const processData = (data) => {
    // Time Series Data
    const timeSeries = data.map((d) => ({
      date: `${d.arrival_date_year}-${d.arrival_date_month}-${d.arrival_date_day_of_month}`,
      visitors: d.adults + d.children + d.babies
    }));

    const country = Object.entries(
      data.reduce((acc, curr) => {
        acc[curr.country] = (acc[curr.country] || 0) + (curr.adults + curr.children + curr.babies);
        return acc;
      }, {})
    ).map(([country, visitors]) => ({ country, visitors }));

    const adult = data.map((d) => d.adults);
    const children = data.map((d) => d.children);

    setTimeSeriesData(timeSeries);
    setCountryData(country);
    setAdultData(adult);
    setChildrenData(children);
  };

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <div className='date-picker'>
      <DatePickerComponent onDateChange={handleDateChange}  />
      </div>
      <div>
      <h2>Visitors Over Time</h2>
      <TimeSeriesChart data={timeSeriesData}  />
      </div>
      <div>
      <h2>Visitors by Country</h2>
      <ColumnChart data={countryData} />
      </div>
      <div>
      <h2>Adult Visitors</h2>
      <SparklineChart data={adultData} title="Adult Visitors" />
      </div>
      <div>
      <h2>Children Visitors</h2>
      <SparklineChart data={childrenData} title="Children Visitors" />
      </div>
    </div>
  );
}

export default App;

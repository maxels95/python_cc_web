import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import Enums, { Sensors } from './Enums'
// import ApexCharts from 'apexcharts';

const Reading = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadings = async () => {
      try {
        const response = await fetch('http://localhost:5262/PythonEnclosure');
        const data = await response.json();
        setReadings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching readings:', error);
        setLoading(false);
      }
    };

    fetchReadings();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Sort readings by sensor parent
  var temperatures = []
  var humidities = []
  var waterLevels = []
  var soilHumitities = []
  readings.forEach(reading => {
    switch (reading){
      case reading.sensorID === Sensors.Temperature:
        temperatures.push(reading)
        break;
      case reading.sensorID === Sensors.Humidity:
        humidities.push(reading)
        break;
      case reading.sensorID === Sensors.Level:
        waterLevels.push(reading)
        break;
      case reading.sensorID === Sensors.Soil_Humidity:
        soilHumitities.push(reading)
        break;
      default:
    }
      
  }) 

  var dataPoints = [];
  var timeStamps = [];
  for (let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    dataPoints.push(reading.value);
    timeStamps.push(new Date(reading.dateTime).getTime());
  }

const options = {
  chart: {
    type: 'line',
  },
  series: [
    {
      data: dataPoints,
    },
  ],
  xaxis: {
    type: 'time',
    categories: timeStamps,
    tickAmount: 2,  // Specify x-axis type as datetime if using timestamps
  },
  stroke: {
    curve: 'smooth',
  }
};

  return (
    <div>
      <h2>Readings</h2>
      <div id="chart">
        <Chart options={options} series={options.series} type="line" height={350} />
      </div>
    </div>
  );
};

export default Reading;

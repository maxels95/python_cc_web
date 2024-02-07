import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {Sensors} from './Enums';
import getChart from './Chart';
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
    if (reading.sensorID === Sensors.Temperature) {
      temperatures.push(reading);
    } else if (reading.sensorID === Sensors.Humidity) {
        humidities.push(reading);
    } else if (reading.sensorID === Sensors.Level) {
        waterLevels.push(reading);
    } else if (reading.sensorID === Sensors.Soil_Humidity) {
      soilHumitities.push(reading);
    } else {
        // Handle the default case if needed
    }
      
  }) 


const tempOptions = getChart(temperatures, Sensors.Temperature)
const humidityOptions = getChart(humidities, Sensors.Humidity)
const levelOptions = getChart(waterLevels, Sensors.Level)
const soilHumititiesOptions = getChart(soilHumitities, Sensors.Soil_Humidity)

  return (
    <div>
      <h2>Readings</h2>
      <div id="chart">
        <Chart options={tempOptions} series={tempOptions.series} type="line" height={350} />
        <Chart options={humidityOptions} series={humidityOptions.series} type="line" height={350} />
        <Chart options={levelOptions} series={levelOptions.series} type="line" height={350} />
        <Chart options={soilHumititiesOptions} series={soilHumititiesOptions.series} type="line" height={350} />
      </div>
    </div>
  );
};

export default Reading;

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {Sensors, SensorNames} from './Enums';
import getChart from './Chart';
import { fetchSensors, fetchReadings, updateRelayManualState } from './Api'
import 'bootstrap/dist/css/bootstrap.min.css';


const Reading = () => {
  const [readings, setReadings] = useState([]);
  const [sensors, setSensors] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const readingData = await fetchReadings();
        const sensorData = await fetchSensors();
        setReadings(readingData);
        setSensors(sensorData);
      } catch (error) {
        console.error('Error:', error.message)
      }
    }
    getData();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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


const handleClick = async (sensorID, newRelayState, controlMode) => {
  try {
    const response = await updateRelayManualState(sensorID, newRelayState, controlMode);
    console.log('API response:', response);
    // Handle the successful response here
  } catch (error) {
    // Handle errors here
  }
};

// create responsive box for displaying a chart
const ReadingBox = ({ sensorID, chartOptions }) => {
  const on = 1;
  const off = 0;
  const autoOn = 1;
  const autoOff = 0;

  return (
    <div className="col-md-6 col-sm-12">
      <div className="custom-box">
        <h4>{SensorNames[sensorID]}</h4>
        <Chart options={chartOptions} series={chartOptions.series} type="line" height={300} />
        <div className="row mt-3">
          <div className="col">
            <button className="btn btn-primary" onClick={() => handleClick(sensorID, on, autoOff)}>On</button>
          </div>
          <div className="col">
            <button className="btn btn-secondary" onClick={() => handleClick(sensorID, off, autoOff)}>Off</button>
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={() => handleClick(sensorID, off, autoOn)}>Auto</button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div>
      <h2>Readings</h2>
      <div id="chart">
      <div className="container-fluid">
      <div className="row">
        <ReadingBox sensorID={Sensors.Temperature} chartOptions={tempOptions} />
        <ReadingBox sensorID={Sensors.Humidity} chartOptions={humidityOptions} />
        <ReadingBox sensorID={Sensors.Level} chartOptions={levelOptions} />
        <ReadingBox sensorID={Sensors.Soil_Humidity} chartOptions={soilHumititiesOptions} />
      </div>
      <ul>
        {sensors.map((sensor, index) => (
          <li key={index}>
            <strong>Sensor {index + 1}:</strong>
            <ul>
              <li>Control Mode: {sensor.controlMode}</li>
              <li>Relay Manual State: {sensor.relayManualState}</li>
              <li>Sensor Pin: {sensor.sensorPin}</li>
              <li>Sensor Relay: {sensor.sensorRelay}</li>
              <li>Sensor Type: {sensor.sensorType}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  );
};

export default Reading;

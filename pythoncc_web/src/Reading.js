// Reading.js
import React, { useState, useEffect } from 'react';

// Reading.js
// ... (previous code)

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
  
    return (
      <div>
        <h2>Readings</h2>
        <ul>
          {readings.map((reading) => (
            <li key={reading.sensorID}>
              Value: {reading.value}, Sensor ID: {reading.sensorID}, TimeStamp: {reading.timeStamp}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Reading;
  

import axios from 'axios';

const sensorsUrl = 'http://localhost:5262/PythonEnclosure/GetSensors';
const readingsUrl = 'http://localhost:5262/PythonEnclosure/GetReadings';
const updateSensorUrl = 'http://localhost:5262/PythonEnclosure/update-relay-manual-state/';

const fetchSensors = async () => {
  try {
    const response = await axios.get(sensorsUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const fetchReadings = async () => {
  try {
    const response = await axios.get(readingsUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const updateRelayManualState = async (sensorId, newRelayManualState, controlMode) => {

  try {
    const response = await fetch(`${updateSensorUrl}?sensorId=${sensorId}&newRelayManualState=${newRelayManualState}&controlMode=${controlMode}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error.message}`);
  }
};


export { fetchSensors, fetchReadings, updateRelayManualState };

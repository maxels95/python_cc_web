import {SensorNames} from './Enums';

export default function getChart(data, sensorID) {
    // Validate input data
    if (!Array.isArray(data) || typeof sensorID !== 'number') {
        throw new Error('Invalid input data. Please provide arrays for data and a numeric sensorID.');
    }

    var sensor = SensorNames[sensorID]

    const colors = {
        0: '#f39c12',
        1: '#2ecc71',
        2: '#3498db',
        3: '#873600'
    }

    var dataPoints = [];
    var timeStamps = [];
    for (let i = 0; i < data.length; i++) {
        const reading = data[i];
        dataPoints.push(reading.value);
        timeStamps.push(new Date(reading.dateTime).getTime());
    }

    const chartOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        series: [{
            name: sensor,
            data: dataPoints,
        }],
        xaxis: {
            categories: timeStamps,
            tickAmount: 2,
        },
        colors: [colors[sensorID]],
    };

    return chartOptions;
}

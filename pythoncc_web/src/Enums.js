const Sensors = {
    Temperature: 0,
    Humidity: 1,
    Level: 2,
    Soil_Humidity: 3
}

const SensorNames = {};
for (const name in Sensors) {
    const value = Sensors[name];
    SensorNames[value] = name;
}

export {Sensors, SensorNames};
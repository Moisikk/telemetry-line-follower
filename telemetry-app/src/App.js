import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch sensor data from ESP32
  const fetchSensorData = async () => {
    try {
      const response = await axios.get("http://<ESP32_IP_ADDRESS>/"); // Replace with ESP32 IP
      setSensorData(response.data);
    } catch (err) {
      setError("ESP32 NU COMUNICA");
    }
  };

  const chartData = {
    labels: Array.from({ length: sensorData.length }, (_, i) => `Sensor ${i + 1}`),
    datasets: [
      {
        label: "Sensor Values",
        data: sensorData,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  <Line data={chartData} />;
  // Fetch data every 1 second
  useEffect(() => {
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Line Follower Telemetry</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Sensor Data</h2>
      <div>
        {sensorData.length > 0 ? (
          <ul>
            {sensorData.map((value, index) => (
              <li key={index}>Sensor {index + 1}: {value}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;

# Aplicație Telemetrie

Această aplicație este dezvoltată pentru a colecta și afișa datele de la un senzor ESP32 în timp real. Este destinatată monitorizării performanțelor unui robot line follower.
---

## **Funcționalități**

- **Colectarea datelor**: Preluarea valorilor senzorilor de la ESP32.
- **Actualizare în timp real**: Datele sunt afișate continuu într-un grafic.
- **Grafic interactiv**: Utilizează `react-chartjs-2` pentru vizualizarea valorilor senzorilor.

---

## **Cum să începi**

### **1. Instalare**

1. Clonează acest repository:
   ```bash
   git clone https://github.com/Moisikk/telemetry-line-follower.git
   cd telemetry-line-follower
   ```

2. Instalează dependențele:
   ```bash
   npm install
   ```

---

### **2. Rulare**

Pentru a rula aplicația în modul de dezvoltare:

1. Pornește serverul:
   ```bash
   npm start
   ```

2. Deschide [http://localhost:3000](http://localhost:3000) în browser pentru a vizualiza aplicația.

- **Pagina se va reîncărca automat** când faci modificări în cod.
- Poți vedea eventualele erori în consolă.

---

### **3. Configurare**

În fișierul `App.js`, înlocuiește `<ESP32_IP_ADDRESS>` cu adresa IP a dispozitivului tău ESP32:
```javascript
const response = await axios.get("http://<ESP32_IP_ADDRESS>/");
```

---

## **Codul principal**

Aplicația utilizează **React**, **Axios** și **react-chartjs-2** pentru a colecta și afișa datele. Mai jos sunt principalele funcționalități:

### **Cod complet din App.js**

```javascript
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
          <Line data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
```

---

## **Dependențe**

- **React**: Framework-ul principal utilizat pentru dezvoltarea aplicației.
- **Axios**: Pentru colectarea datelor de la ESP32 prin HTTP.
- **Chart.js** și **react-chartjs-2**: Pentru afișarea datelor în grafice.

Instalează toate dependențele cu:
```bash
npm install
```

---

## **Contribuții**

Contribuțiile sunt binevenite! Dacă dorești să adaugi funcționalități sau să îmbunătățești aplicația:

1. Forkează repository-ul.
2. Creează o nouă ramură (`git checkout -b feature/noua-funcționalitate`).
3. Trimite un Pull Request.

---

## **Licență**

Acest proiect este licențiat sub licența [MIT](https://opensource.org/licenses/MIT). Poți utiliza, modifica și distribui liber codul.

---

## **Capturi de ecran (Opțional)**

Include capturi de ecran ale aplicației în funcțiune pentru a arăta cum arată interfața utilizatorului.

---

Pentru orice întrebare sau problemă, nu ezita să mă contactezi! 😊


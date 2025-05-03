import { useState, useEffect } from "react";
import "./index.css";

const KEY = "db5a0200b7094f3ca2a141842250205";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
        );
        console.log(res);
        // if(!res.ok){
        //   throw new Error("error")
        // }
        const data = await res.json();
        if (data.error) {
          setError(data.error.message);
        }
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setWeatherData(null);
      }
    }
    getData();
  }, [city]);

  console.log(weatherData);
  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input
              type="text"
              value={city}
              placeholder="Enter city name"
              className="search-input"
              onChange={(e) => {
                const city = e.target.value;
                setCity(city);
              }}
            />
          </div>
        </div>
        <div className="weather-card">
          <h2>
            {weatherData?.location?.name}, {weatherData?.location?.country}
          </h2>
          <img
            src={weatherData?.current?.condition?.icon}
            alt="icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData?.current?.temp_c}°C</p>
          <p className="condition">{weatherData?.current?.condition?.text}</p>
          <div className="weather-details">
            <p>Humidity: {weatherData?.current?.humidity}%</p>
            <p>Wind: {weatherData?.current?.wind_kph} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

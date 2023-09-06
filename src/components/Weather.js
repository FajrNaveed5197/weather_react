import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./weather.css";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ba57ec457b75f6aaaaecf043ccf102ab`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        await fetchWeatherData();
      }
    };

    fetchData();
  }, [city, fetchWeatherData]);

  return (
    <div className="container main">
      <div className="row">
        <div className="col-12" style={{ display: "flex", justifyContent: "center" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchWeatherData();
            }}
          >
            <input
              type="text"
              className="rounded-input" style={{width:"350px"}}
              placeholder="Enter Location to see result"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-6 mt-5">
          <h4 style={{ display: "flex", justifyContent: "end" }}>
            {weatherData?.name || "..."}
          </h4>
          <div>
            <h1 style={{ display: "flex", justifyContent: "end" }}>
              {weatherData?.main?.temp ? `${weatherData.main.temp}° F` : "..."}
            </h1>
          </div>
          <div className="col-6" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", display: "flex", alignItems: "flex-start" }}>
            <h4 style={{ marginLeft: "60vh" }}>
              {weatherData?.weather && weatherData.weather[0]?.main
                ? weatherData.weather[0].main
                : "..."}
            </h4>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "100%", marginTop: "30%" }}>
          <div className="col-5" style={{ borderRadius: "20px", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            <div className="row mt-4" style={{ marginLeft: "5%" }}>
              <div className="col-4">
                <h3>{weatherData?.main?.feels_like ? `${weatherData.main.feels_like}° F` : "..."}</h3>
                <p>Feels Like</p>
              </div>

              <div className="col-4">
                <h3>{weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : "..."}</h3>
                <p>Humidity</p>
              </div>

              <div className="col-4">
                <h3>{weatherData?.wind?.speed ? `${weatherData.wind.speed} MPH` : "..."}</h3>
                <p>Winds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

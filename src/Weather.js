import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [weather, setWeather] = useState("");

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search for a city.."
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "1d038ee28ef2727a9f0310860ac10ae9";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }
  function showWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  return (
    <div>
      {form}
      <ul>
        <li>Temperature: {Math.round(weather.temperature)}°C</li>
        <li>Description: {weather.description}</li>
        <li>Humidity: {weather.humidity}%</li>
        <li>Wind: {weather.wind}km/h</li>
        <li>
          <img src={weather.icon} alt={weather.description} />
        </li>
      </ul>
    </div>
  );
}

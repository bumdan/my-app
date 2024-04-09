import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
  let api_key = "d2abaaa782933031c722bd249ee4ef39";
  let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

  const [cityInput, setCityInput] = useState('');

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      search();
    }
  }



  const [wicon, setWicon] = useState(clear_icon);
  const [error, setError] = useState(null);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");

    if (element[0].value === "") {
      setError("Please enter a city.");
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&lat=44.34&lon=10.99&appid=${api_key}`;

    try {
      let respone = await fetch(url);

      if (!respone.ok) {
        setError("City not found. Please check your input.");
        return;
      }

      setError(null);

      let data = await respone.json();
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const tem = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const country = document.getElementsByClassName("weather-country");

      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
      tem[0].innerHTML = Math.floor(data.main.temp) + "°c";
      location[0].innerHTML = data.name;
      country[0].innerHTML = regionNames.of(data.sys.country);
      

      
      let currentWeather = data.weather[0].icon;

      if (currentWeather === "01d" || currentWeather === "01n") {
        setWicon(clear_icon);
      } else if (currentWeather === "02d" || currentWeather === "02n") {
        setWicon(cloud_icon);
      } else if (currentWeather === "03d" || currentWeather === "03n") {
        setWicon(drizzle_icon);
      } else if (currentWeather === "04d" || currentWeather === "04n") {
        setWicon(drizzle_icon);
      } else if (currentWeather === "09d" || currentWeather === "09n") {
        setWicon(rain_icon);
      } else if (currentWeather === "10d" || currentWeather === "10n") {
        setWicon(rain_icon);
      } else if (currentWeather === "13d" || currentWeather === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      setError("An error occurred while fetching weather data.");
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search"
          value={cityInput} onChange={(event) => setCityInput(event.target.value)} onKeyPress={handleKeyPress}/>
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <div className="weather-temp">24°C</div>
          <div className="weather-location">London</div>
          <div className="weather-country">England</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="test">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-rate">18 km/h</div>
                <div className="test">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

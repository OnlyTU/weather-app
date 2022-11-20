import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import ForecastWeather from "./components/forecast-weather/forecast-weather";
import Search from "./components/search/search.js";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);


  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `https://localhost:7004/api/weather/${lat}/${lon}`
    );
    const forecastWeatherFetch = fetch(
      `https://localhost:7004/api/forecast/${lat}/${lon}`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        console.log(weatherResponse);
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <ForecastWeather data={forecastWeather} />}
    </div>
  );
}

export default App;

import "./forecast-weather.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ForecastWeather = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className="title">Forecasts</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 3).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  ></img>
                  <label className="day">{forecastDays[index]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="temp">{Math.round(item.main.temp)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Feels Like</label>
                  <label className="feels-like">
                    {Math.round(item.main.feels_like)}°C
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label className="humidity">{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind Speed</label>
                  <label className="wind-speed">{item.wind.speed} km/h</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label className="humidity">{item.main.pressure}hPa</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default ForecastWeather;

import React from "react";
import 'normalize.css';
import './WeatherCard.css';

const WeatherCard = ({
  city,
  dataWeather: {dt_txt},
  dataWind:{deg,speed},
  dataMain:{feels_like,humidity,temp_max,temp_min},
  dataClouds:{all},
  dataDescription:{description, icon}
}) => {
  console.log(city)

  const tempCelsius = (celsius) => Math.round(celsius - 273);
  const imageWeather = `https://openweathermap.org/img/w/${icon}.png`;
  const windSpeed = (wind) => Math.round(wind * 3.6);
  let windDirection;
  const getWindDirection = (direction) => {
    switch (true) {
      case 0:
      case 360:
        windDirection = "N";
        break;
      case 90:
        windDirection = "E";
        break;
      case 180:
        windDirection = "S";
        break;
      case 270:
        windDirection = "W";
        break;
      case (direction > 0 && direction < 90):
        windDirection = "NE";
        break;
      case (direction > 90 && direction < 180):
        windDirection = "SE";
        break;
      case (direction > 180 && direction < 270):
        windDirection = "SW";
        break;
      case (direction > 270 && direction < 360):
        windDirection = "NW";
        break;
      default:
        windDirection = "-";
        break;
    }
    return windDirection;
  };

  const date = new Date(dt_txt)
  const dateMDYHM = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}${date.getMinutes()}`;


  return <article className='weather-card'>
    <h3>Date/Time: {dateMDYHM}</h3>
    <img src={imageWeather} alt='weather icon' className="weather-icon"/>
    <p>Weather: {description}</p>
    <p>Clouds: {all}%</p>
    <p>Max./Min. Temp.: {tempCelsius(temp_max)}ºC / {tempCelsius(temp_min)}ºC</p>
    <p>Feels like: {tempCelsius(feels_like)}ºC</p>
    <p>Humidity: {humidity}%</p>
    <p>Wind speed: {windSpeed(speed)}km/h {getWindDirection(deg)}</p>
  </article>
};

export default WeatherCard;

import React, { useState, useEffect } from "react";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import WeatherCard from './WeatherCard'

const WeatherList = () => {

  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState([]); // Para guardar las predicciones
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const convertGeolocation = async (latitude, longitude) => {
      try {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`);
        const cityName = res.data[0].name;
        setCity(cityName);
      } catch (error) {
        console.error('Error converting geolocation:', error);
      }
    };

    if (userLocation) {
      convertGeolocation(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  const handleSubmit = e => {
    e.preventDefault();
    setCity(e.target.city.value);
    e.target.city.value = '';
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`);
        const weather = res.data.list;
        //await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        setWeatherInfo(weather);

      } catch (e) {
        setWeatherInfo([]);
      }
    }
    fetchWeather();
  }, [city]);


  const renderItems = () =>
    weatherInfo.map((item, i) => (
      <WeatherCard
        key={uuidv4()}
        city={city}
        dataWeather={item}
        dataMain={item.main}
        dataWind={item.wind}
        dataClouds={item.clouds}
        dataDescription={item.weather[0]}
      />
    ));

  return <section className="searcher">
    <form onSubmit={handleSubmit}>
      <label htmlFor="city">Introduce your city(and pulse INTRO):</label>
      <input name="city" id="city" />
    </form>
    {weatherInfo.length > 0 ? <><h2>This is next 5 days forecast for {city}</h2> {renderItems()}</> : <p>Consult your city weather prediction</p>}
  </section>;
};

export default WeatherList;

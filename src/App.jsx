import { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import LoadingScreen from './components/LoadingScreen';
import { getWeatherBackground } from './utils/weatherBackgrounds';

export default function App() {
  // Initialize state by checking localStorage first
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    return savedCity || '';
  });

  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [loadingScreenExiting, setLoadingScreenExiting] = useState(false);
  const { data, loading, error } = useWeather(city);

  // Show loading screen on mount, then slide it away before unmounting.
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setLoadingScreenExiting(true);
    }, 1800);
    const removeTimer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Sync state changes to localStorage whenever a successful search happens
  useEffect(() => {
    if (city && data && !error) {
      localStorage.setItem('lastSearchedCity', city);
    }
  }, [city, data, error]);

  const weatherBg = getWeatherBackground(data?.current?.weather[0]?.main);

  // Sync background class to body for full-screen effect
  useEffect(() => {
    if (weatherBg && weatherBg.className) {
      document.body.className = weatherBg.className;
    }
  }, [weatherBg]);

  return (
    <>
      {showLoadingScreen && <LoadingScreen isExiting={loadingScreenExiting} />}

      <div className={`app-container ${weatherBg.className}`}>
        <header className="app-header">
          <h1>Weather Analytics Dashboard</h1>
          <p>Get real-time weather insights for any city</p>
        </header>

        <SearchBar onSearch={setCity} />

        {!city && !loading && !error && (
          <div className="empty-state">
            <p>Please enter a city name to see the weather analytics.</p>
          </div>
        )}

        {loading && <p className="loading-message">Retrieving live meteorological data...</p>}

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {data && !loading && (
          <main className="main-content">
            <div className="weather-header">
              <div className="weather-info">
                <div className="city">
                  <h2>{data.current.name}, {data.current.sys?.country}</h2>
                  <p className="weather-description">
                    {data.current.weather[0].description}
                  </p>
                </div>
                <div className="weather-temp">
                  {Math.round(data.current.main.temp)}°C
                </div>
              </div>
            </div>

            <div className="weather-details">
              <div className="weather-detail-item border">
                <strong>Humidity</strong>
                <span>{data.current.main.humidity}%</span>
              </div>
              <div className="weather-detail-item border">
                <strong>Wind Speed</strong>
                <span>{data.current.wind.speed} m/s</span>
              </div>
              <div className="weather-detail-item">
                <strong>Feels Like</strong>
                <span>{Math.round(data.current.main.feels_like)}°C</span>
              </div>
            </div>

            <Forecast forecastData={data.forecast} />
          </main>
        )}
      </div>
    </>
  );
}

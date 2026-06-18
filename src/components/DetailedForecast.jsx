import { useState } from 'react';
import '../styles/DetailedForecast.css';

export default function DetailedForecast({ forecastData, selectedDay, onClose }) {
  const [selectedForecast, setSelectedForecast] = useState(selectedDay);
  const formattedDay = new Date(selectedDay.dt_txt).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  // Get all forecasts for the selected day
  const dayForecasts = forecastData?.list?.filter((item) => {
    const forecastDate = new Date(item.dt_txt).toLocaleDateString();
    const selectedDate = new Date(selectedDay.dt_txt).toLocaleDateString();
    return forecastDate === selectedDate;
  }) || [];

  return (
    <div className="detailed-forecast-overlay" onClick={onClose}>
      <div className="detailed-forecast-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close detailed forecast">×</button>

        <div className="detailed-header">
          <div>
            <p className="detail-kicker">{formattedDay}</p>
            <h2>{selectedDay.weather[0].description}</h2>
            <p className="weather-condition">Updated in 3-hour forecast intervals</p>
          </div>
          <div className="detail-hero-temp">
            <img 
              src={`https://openweathermap.org/img/wn/${selectedForecast.weather[0].icon}@2x.png`}
              alt=""
              aria-hidden="true"
            />
            <span>{Math.round(selectedForecast.main.temp)}°C</span>
          </div>
        </div>

        <div className="hourly-forecast">
          <h3>Hourly Forecast</h3>
          <div className="hourly-container">
            {dayForecasts.map((forecast) => (
              <button
                type="button"
                key={forecast.dt}
                className={`hourly-item${selectedForecast.dt === forecast.dt ? ' is-selected' : ''}`}
                onClick={() => setSelectedForecast(forecast)}
                aria-label={`Select forecast for ${new Date(forecast.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`}
              >
                <p className="time">
                  {new Date(forecast.dt_txt).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
                <img 
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                  className="hourly-icon"
                />
                <p className="temp">{Math.round(forecast.main.temp)}°C</p>
              </button>
            ))}
          </div>
        </div>

        <div className="detailed-metrics">
          <h3>Weather Details</h3>
          <div className="metric-grid">
            <div className="metric-card">
              <p className="metric-label">Temperature</p>
              <p className="metric-value">{Math.round(selectedForecast.main.temp)}°C</p>
              <p className="metric-sub">Feels like {Math.round(selectedForecast.main.feels_like)}°C</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Humidity</p>
              <p className="metric-value">{selectedForecast.main.humidity}%</p>
              <div className="humidity-bar">
                <div 
                  className="humidity-fill" 
                  style={{ width: `${selectedForecast.main.humidity}%` }}
                ></div>
              </div>
            </div>

            <div className="metric-card">
              <p className="metric-label">Pressure</p>
              <p className="metric-value">{selectedForecast.main.pressure} hPa</p>
              <p className="metric-sub">{selectedForecast.main.sea_level ? 'Sea level: ' + selectedForecast.main.sea_level + ' hPa' : ''}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Wind Speed</p>
              <p className="metric-value">{selectedForecast.wind.speed} m/s</p>
              <p className="metric-sub">Gust: {selectedForecast.wind.gust ? selectedForecast.wind.gust + ' m/s' : 'N/A'}</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Visibility</p>
              <p className="metric-value">{(selectedForecast.visibility / 1000).toFixed(1)} km</p>
            </div>

            <div className="metric-card">
              <p className="metric-label">Cloudiness</p>
              <p className="metric-value">{selectedForecast.clouds.all}%</p>
              <div className="clouds-bar">
                <div 
                  className="clouds-fill" 
                  style={{ width: `${selectedForecast.clouds.all}%` }}
                ></div>
              </div>
            </div>

            {selectedForecast.rain && (
              <div className="metric-card">
                <p className="metric-label">Rain Volume (3h)</p>
                <p className="metric-value">{selectedForecast.rain['3h']} mm</p>
              </div>
            )}

            {selectedForecast.snow && (
              <div className="metric-card">
                <p className="metric-label">Snow Volume (3h)</p>
                <p className="metric-value">{selectedForecast.snow['3h']} mm</p>
              </div>
            )}

            <div className="metric-card">
              <p className="metric-label">Condition</p>
              <p className="metric-value capitalize">{selectedForecast.weather[0].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

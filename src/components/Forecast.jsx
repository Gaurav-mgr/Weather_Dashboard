import { useState } from 'react';
import { filterFiveDayForecast, formatDayName } from '../utils/helpers';
import DetailedForecast from './DetailedForecast';

export default function Forecast({ forecastData }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const dailyForecast = filterFiveDayForecast(forecastData?.list);

  return (
    <>
      <div className="forecast-section">
        <h3>5-Day Forecast</h3>
        
        <div className="forecast-container">
          {dailyForecast.map((day) => (
            <button
              type="button"
              key={day.dt}
              className="forecast-card"
              onClick={() => setSelectedDay(day)}
              aria-label={`View detailed forecast for ${formatDayName(day.dt_txt)}`}
            >
              <span className="forecast-card-top">
                <span className="forecast-day">
                  {formatDayName(day.dt_txt)}
                </span>
                <span className="forecast-chevron" aria-hidden="true">›</span>
              </span>

              <span className="forecast-visual">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                  alt={day.weather[0].description}
                  className="forecast-icon"
                />
              </span>

              <span className="forecast-temp">
                {Math.round(day.main.temp)}°C
              </span>
              <span className="forecast-description">
                {day.weather[0].main}
              </span>
              <span className="forecast-meta">
                Feels {Math.round(day.main.feels_like)}°C
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedDay && (
        <DetailedForecast 
          forecastData={forecastData}
          selectedDay={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  );
}

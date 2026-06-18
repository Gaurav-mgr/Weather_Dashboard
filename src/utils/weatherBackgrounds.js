/**
 * Get background style and CSS class based on weather condition
 * @param {string} weatherMain - Weather condition (e.g., "Clear", "Clouds", "Rain", etc.)
 * @returns {object} - Object with backgroundStyle and className
 */
export const getWeatherBackground = (weatherMain) => {
  const condition = weatherMain?.toLowerCase() || 'clear';

  const backgrounds = {
    clear: {
      className: 'weather-bg-clear',
      description: 'Sunny'
    },
    clouds: {
      className: 'weather-bg-clouds',
      description: 'Cloudy'
    },
    rain: {
      className: 'weather-bg-rain',
      description: 'Rainy'
    },
    drizzle: {
      className: 'weather-bg-drizzle',
      description: 'Drizzle'
    },
    thunderstorm: {
      className: 'weather-bg-thunderstorm',
      description: 'Thunderstorm'
    },
    snow: {
      className: 'weather-bg-snow',
      description: 'Snow'
    },
    mist: {
      className: 'weather-bg-mist',
      description: 'Misty'
    },
    smoke: {
      className: 'weather-bg-mist',
      description: 'Smoky'
    },
    haze: {
      className: 'weather-bg-mist',
      description: 'Hazy'
    },
    dust: {
      className: 'weather-bg-mist',
      description: 'Dusty'
    },
    fog: {
      className: 'weather-bg-mist',
      description: 'Foggy'
    },
    sand: {
      className: 'weather-bg-mist',
      description: 'Sandy'
    },
    ash: {
      className: 'weather-bg-mist',
      description: 'Ashy'
    },
    squall: {
      className: 'weather-bg-rain',
      description: 'Squall'
    },
    tornado: {
      className: 'weather-bg-thunderstorm',
      description: 'Tornado'
    }
  };

  return backgrounds[condition] || backgrounds.clear;
};

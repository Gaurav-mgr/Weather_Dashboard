const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city, apiKey) => {
  // We get current weather
  const weatherResponse = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${apiKey}`
  );
  
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.status === 404 ? 'City not found' : 'Failed to fetch weather');
  }

  const weatherData = await weatherResponse.json();

  // We use the coordinates from the first call to get the 5-day forecast
  const { lat, lon } = weatherData.coord;
  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast');
  }

  const forecastData = await forecastResponse.json();

  // Return a clean, combined object
  return {
    current: weatherData,
    forecast: forecastData
  };
};

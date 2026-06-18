/**
 * Filters the 3-hour forecast list down to one reading per day (around noon)
 * @param {Array} forecastList - The raw 40-item array from the API
 * @returns {Array} - A filtered 5-item array for the 5-day forecast
 */
export const filterFiveDayForecast = (forecastList) => {
  if (!forecastList) return [];

  // Filter items that capture weather around midday (12:00:00)
  return forecastList.filter((item) => item.dt_txt.includes('12:00:00'));
};

/**
 * Converts a date string into a readable day name (e.g., "Monday")
 * @param {string} dateString - "2026-06-04 12:00:00"
 * @returns {string} - "Mon"
 */
export const formatDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};
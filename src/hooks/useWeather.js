import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../services/weatherApi';

export const useWeather = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if the city string is empty
    if (!city) return;

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    let isMounted = true; // Prevents race conditions

    const getAppBreakdown = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchWeatherData(city, apiKey);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getAppBreakdown();

    // Cleanup function: if the user types quickly, cancel the previous state update
    return () => {
      isMounted = false;
    };
  }, [city]);

  return { data, loading, error };
};
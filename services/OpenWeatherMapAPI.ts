import axios from 'axios';
import { OPEN_WEATHER_MAP_API_KEY, GOOGLE_MAPS_API_KEY } from '@env'

export const getCoordinates = async (address: string): Promise<{ lat: number, lon: number }> => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lon: lng };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchWeatherData = async (city: string) => {
  try {
    const { lat, lon } = await getCoordinates(city);
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
  

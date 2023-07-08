import axios from 'axios';
import { OPEN_WEATHER_MAP_API_KEY } from '@env'

export const fetchWeatherData = async (city: string) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_MAP_API_KEY}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

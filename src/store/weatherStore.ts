import { create } from 'zustand';

interface WeatherStore {
  weatherData: any | null; // Replace 'any' with your actual weather data type
  setWeatherData: (data: any | null) => void; // Replace 'any' with your actual weather data type
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: null,
  setWeatherData: (data) => set({ weatherData: data }),
}));

import React, { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Snackbar } from 'react-native-paper'
import { useWeatherStore } from '../store/weatherStore'; 
import { fetchWeatherData } from '../../services/OpenWeatherMapAPI';
import { weatherConditions, WeatherConditionCode } from '../animations/weatherAnimation';
import LocationSearchBar from '../components/LocationSearchBar';
import { WeatherDataCard } from '../components/WeatherDataCard';
import { AnimationCard } from '../components/AnimationCard';
import { styles } from '../../styles';

export const LocalWeather = () => {
  const { weatherData, setWeatherData } = useWeatherStore(); 
  console.log('Weather data at the beginning of render:', weatherData); // Add this line
  const [error, setError] = useState<string | null>(null); 
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    console.log('Updated weather data:', weatherData);
  }, [weatherData]); // Add this useEffect hook

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const data = await fetchWeatherData(lat, lon);
      console.log('Fetched data:', data); // Log the fetched data
      setSearchQuery(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
      setWeatherData(data);
      console.log('Weather data after setWeatherData:', weatherData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.'); 
    }
  };

  let isDay, timeOfDay, weatherCondition, animation, isRaining, chanceOfRain = 0;
  let isNight = false; // Initialize isNight to false

  console.log('Weather data:', weatherData); // Add this line
  
  if (weatherData) {
    isRaining = weatherData.current.weather.some((condition: { main: string }) => condition.main.toLowerCase().includes('rain'));

    const currentTime = Math.floor(new Date().getTime() / 1000);
    isDay = currentTime > weatherData.current.sunrise && currentTime < weatherData.current.sunset;
    isNight = !isDay;
    timeOfDay = isDay ? 'day' : 'night';

    weatherCondition = weatherData.current.weather[0].description.toLowerCase();

    animation = weatherConditions[timeOfDay as 'day' | 'night'][weatherCondition as WeatherConditionCode];

    // Get the chance of rain for the current hour
    chanceOfRain = weatherData.hourly[0].pop;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LocationSearchBar 
        onLocationChange={fetchWeather} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
  
      {weatherData && (
        <WeatherDataCard 
          weatherData={weatherData} 
          searchQuery={searchQuery} 
          isRaining={isRaining} 
          chanceOfRain={chanceOfRain}
        />
      )}
  
      {weatherData && (
        <AnimationCard
          weatherCode={parseInt(weatherData.current.weather[0].id)}
          isNight={isNight}
          chanceOfRain={chanceOfRain}
        />
      )}
  
      <Snackbar
        visible={error !== null}
        onDismiss={() => setError(null)}
        action={{
          label: 'Dismiss',
          onPress: () => setError(null),
        }}
      >
        {error}
      </Snackbar>
    </SafeAreaView>
  );
      }

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Snackbar } from 'react-native-paper';
import { useWeatherStore } from '../store/weatherStore'; // Import the store
import { fetchWeatherData } from '../../services/OpenWeatherMapAPI';

export const LocalWeather = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { weatherData, setWeatherData } = useWeatherStore(); // Use the store
  const [error, setError] = useState<string | null>(null); // Declare error state

  const onChangeSearch = (query: string) => setSearchQuery(query); // Specify the type of the query parameter

  const fetchWeather = async () => {
    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.'); // Set error message
    }
  };

  // Check if it's currently raining
  const isRaining = weatherData?.current?.weather.some((condition: { main: string }) => condition.main.toLowerCase().includes('rain'));

  // Get the current probability of precipitation
  const pop = weatherData?.current?.pop;

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>Weather in {searchQuery}</Title>
          <Paragraph>{weatherData?.current.temp - 273.15}°C</Paragraph>
          <Paragraph style={styles.paragraph}>
           Weather: {weatherData?.current.weather[0].main}
          </Paragraph>
          <Paragraph style={styles.paragraph}>
           Description: {weatherData?.current.weather[0].description}
          </Paragraph>
          <Paragraph style={styles.paragraph}>
           Rain: {isRaining ? 'Yes' : 'No'}
         </Paragraph>
          <Paragraph style={styles.paragraph}>
         Chance of Rain: {weatherData?.hourly[0].pop * 100}%
         </Paragraph>
        </Card.Content>
      </Card>

      <Button mode="contained" onPress={fetchWeather} style={styles.button}>
        Get Weather
      </Button>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchbar: {
    marginTop: 30,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    marginTop: 20,
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    borderColor: '#3F51B5',
    color: '#3F51B5',
    marginTop: 20,
  },
});

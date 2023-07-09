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

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a location"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Button mode="contained" onPress={fetchWeather}>
        Get Weather
      </Button>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Weather in {weatherData?.name}</Title>
          <Paragraph>{weatherData?.main.temp}°C</Paragraph>
        </Card.Content>
      </Card>
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
    justifyContent: 'center',
  },
  searchbar: {
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
  },
});

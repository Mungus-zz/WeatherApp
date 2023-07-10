import LottieView from 'lottie-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Snackbar } from 'react-native-paper';
import { useWeatherStore } from '../store/weatherStore'; 
import { fetchWeatherData } from '../../services/OpenWeatherMapAPI';
import { weatherConditions, WeatherConditionCode } from '../animations/weatherAnimation';

export const LocalWeather = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { weatherData, setWeatherData } = useWeatherStore(); 
  const [error, setError] = useState<string | null>(null); 

  const onChangeSearch = (query: string) => setSearchQuery(query); 

  const fetchWeather = async () => {
    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.'); 
    }
  };

  let isDay, timeOfDay, weatherCondition, animation, isRaining;

  if (weatherData) {
    isRaining = weatherData.current.weather.some((condition: { main: string }) => condition.main.toLowerCase().includes('rain'));

    const currentTime = Math.floor(new Date().getTime() / 1000);
    isDay = currentTime > weatherData.current.sunrise && currentTime < weatherData.current.sunset;
    timeOfDay = isDay ? 'day' : 'night';

weatherCondition = weatherData.current.weather[0].description.toLowerCase();

    animation = weatherConditions[timeOfDay as 'day' | 'night'][weatherCondition as WeatherConditionCode];
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
    style={styles.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={false}
  >
      <Searchbar
        placeholder="Search for a location"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.cardsContainer}>
  {animation && (
    <Card style={styles.card}>
      <Card.Content>
      <LottieView source={animation} autoPlay loop style={{ width: '100%', height: '100%' }} />
      </Card.Content>
    </Card>
  )}
  <Card style={styles.card}>
    <Card.Content>
      <Title>Weather in {searchQuery}</Title>
      {weatherData && (
        <>
          <View style={styles.weatherInfo}>
            <Paragraph>{((weatherData.current.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</Paragraph>
            <Paragraph style={styles.paragraph}>
              Weather: {weatherData.current.weather[0].main}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Description: {weatherData.current.weather[0].description}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Rain: {isRaining ? 'Yes' : 'No'}
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Chance of Rain: {weatherData.hourly[0].pop * 100}%
            </Paragraph>
          </View>
        </>
      )}
    </Card.Content>
  </Card>
</View>
</KeyboardAwareScrollView>
      
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
  lottie: {
    width: 800,
    height: 800,
    alignSelf: 'center',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
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
  weatherInfo: {
    flexDirection: 'column',
  }
});

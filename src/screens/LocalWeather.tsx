import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Snackbar } from 'react-native-paper';
import { useWeatherStore } from '../store/weatherStore'; 
import { fetchWeatherData } from '../../services/OpenWeatherMapAPI';
import { weatherConditions, WeatherConditionCode } from '../animations/weatherAnimation';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchbar: {
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    marginBottom: 20,
  },
  dataCard: {
    flex: 1,
    marginBottom: 20,
    padding: 20,
  },
  animationCard: {
    flex: 3,
  },
  lottie: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    padding: 5,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  alert: {
    fontSize: 20,
    color: '#ff0000',
    fontWeight: 'bold',
  },
});


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

  let isDay, timeOfDay, weatherCondition, animation, isRaining, chanceOfRain = 0;

if (weatherData) {
  isRaining = weatherData.current.weather.some((condition: { main: string }) => condition.main.toLowerCase().includes('rain'));

  const currentTime = Math.floor(new Date().getTime() / 1000);
  isDay = currentTime > weatherData.current.sunrise && currentTime < weatherData.current.sunset;
  timeOfDay = isDay ? 'day' : 'night';

  weatherCondition = weatherData.current.weather[0].description.toLowerCase();

  animation = weatherConditions[timeOfDay as 'day' | 'night'][weatherCondition as WeatherConditionCode];

  // Get the chance of rain for the current hour
  chanceOfRain = weatherData.hourly[0].pop;
}

let alerts = null;
if (weatherData && weatherData.alerts) {
  alerts = weatherData.alerts.map((alert: { event: string, description: string }) => (
    <Paragraph style={styles.alert}>
      Alert: {alert.event} - {alert.description}
    </Paragraph>
  ));
}


return (
  <View style={styles.container}>
    <Searchbar
      placeholder="Search for a location"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.searchbar}
    />
    <Button mode="contained" onPress={fetchWeather} style={styles.button}>
      Get Weather
    </Button>
    {weatherData && (
      <Card style={styles.dataCard}>
        <ScrollView>
         <Card.Content>
            <Title style={styles.title}>Weather in {searchQuery}</Title>
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
               Chance of Rain for the Current Hour: {chanceOfRain * 100}%
             </Paragraph>
          </Card.Content>
        </ScrollView>
      </Card>
    )}
    {animation && (
     <Card style={styles.animationCard}>
       <Card.Content>
         <Title style={styles.title}>Chance of Rain: {chanceOfRain * 100}%</Title>
         <LottieView source={animation} autoPlay loop style={styles.lottie} />
       </Card.Content>
     </Card>
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
  </View>
  );
};

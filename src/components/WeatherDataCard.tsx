// WeatherDataCard.tsx
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { styles } from '../../styles';

// Define a type for your weather data
interface WeatherData {
  current: {
    temp: number;
    weather: Array<{ main: string; description: string }>;
  };
}

interface WeatherDataCardProps {
  weatherData: WeatherData;
  searchQuery: string;
  isRaining: boolean;
  chanceOfRain: number;
}

export const WeatherDataCard: React.FC<WeatherDataCardProps> = ({ weatherData, searchQuery, isRaining, chanceOfRain }) => (
  <Card style={styles.dataCard}>
    <ScrollView>
      <Card.Content>
        <Title style={styles.title}>Weather for {searchQuery}</Title>
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
);

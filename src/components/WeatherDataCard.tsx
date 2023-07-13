import React from 'react';
import { Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { styles } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

interface WeatherDataCardProps {
  weatherData: any;
  cityName: string;
  isRaining: boolean;
  chanceOfRain: number;
}

export const WeatherDataCard: React.FC<WeatherDataCardProps> = ({ weatherData, cityName, isRaining, chanceOfRain }) => (
  <Card style={styles.dataCard}>
    <Card.Content>
      <Title style={styles.title}>Weather for {cityName || 'Loading...'}</Title>
      <View style={styles.row}>
        <Icon name="thermometer-half" size={24} color="#000" />
        <Paragraph style={styles.temp}>{((weatherData.current.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</Paragraph>
      </View>
      <View style={styles.row}>
        <Icon name="cloud" size={24} color="#000" /> 
        <Paragraph style={styles.paragraph}>Weather: {weatherData.current.weather[0].main}</Paragraph>
      </View>
      <View style={styles.row}>
        <Icon name="info-circle" size={24} color="#000" /> 
        <Paragraph style={styles.paragraph}>Description: {weatherData.current.weather[0].description}</Paragraph>
      </View>
      <View style={styles.row}>
        <Icon name={isRaining ? "cloud-rain" : "cloud"} size={24} color="#000" /> 
        <Paragraph style={styles.paragraph}>Rain: {isRaining ? 'Yes' : 'No'}</Paragraph>
      </View>
      <View style={styles.row}>
        <Icon name="umbrella" size={24} color="#000" /> 
        <Paragraph style={styles.paragraph}>Chance of Rain for the Current Hour: {chanceOfRain * 100}%</Paragraph>
      </View>
    </Card.Content>
  </Card>
);

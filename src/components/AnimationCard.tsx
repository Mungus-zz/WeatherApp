// AnimationCard.tsx
import React from 'react';
import { Card, Title } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { styles } from '../../styles';

import { weatherConditions } from '../animations/weatherAnimation';

// Define a type for your animation 
type AnimationSource = any; // Replace 'any' with the actual type of your animation source

interface AnimationCardProps {
  weatherCode: number; // Use the weather code instead of the weather condition
  isNight: boolean;
  chanceOfRain: number;
}

// Define the type of the weatherConditions object
interface WeatherConditions {
  day: { [key: string]: AnimationSource };
  night: { [key: string]: AnimationSource };
}

// Cast the imported weatherConditions object to the WeatherConditions type
const weatherConditionsTyped = weatherConditions as WeatherConditions;

export const AnimationCard: React.FC<AnimationCardProps> = ({ weatherCode, isNight, chanceOfRain }) => {
  const animation = isNight ? weatherConditionsTyped.night[weatherCode.toString()] : weatherConditionsTyped.day[weatherCode.toString()];


  return (
    <Card style={styles.animationCard}>
      <Card.Content>
        <Title style={styles.title}>Chance of Rain: {chanceOfRain * 100}%</Title>
        <LottieView source={animation} autoPlay loop style={styles.lottie} />
      </Card.Content>
    </Card>
  );
};
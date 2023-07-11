// AnimationCard.tsx
import React from 'react';
import { Card, Title } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { styles } from '../../styles';

import { weatherConditions, WeatherConditionCode } from '../animations/weatherAnimation';

// Define a type for your animation 
type AnimationSource = any; // Replace 'any' with the actual type of your animation source

interface AnimationCardProps {
  weatherCondition: WeatherConditionCode;
  isNight: boolean;
  chanceOfRain: number;
}

export const AnimationCard: React.FC<AnimationCardProps> = ({ weatherCondition, isNight, chanceOfRain }) => {
  const animation = isNight ? weatherConditions.night[weatherCondition] : weatherConditions.day[weatherCondition];
  return (
    <Card style={styles.animationCard}>
      <Card.Content>
        <Title style={styles.title}>Chance of Rain: {chanceOfRain * 100}%</Title>
        <LottieView source={animation} autoPlay loop style={styles.lottie} />
      </Card.Content>
    </Card>
  );
};

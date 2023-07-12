import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { styles } from '../../styles';

import { weatherConditions } from '../animations/weatherAnimation';

type AnimationSource = any;

interface AnimationCardProps {
  weatherCode: number;
  isNight: boolean;
  chanceOfRain: number;
}

interface WeatherConditions {
  day: { [key: string]: AnimationSource };
  night: { [key: string]: AnimationSource };
}

const weatherConditionsTyped = weatherConditions as WeatherConditions;

export const AnimationCard: React.FC<AnimationCardProps> = ({ weatherCode, isNight, chanceOfRain }) => {
  const getAnimation = (): AnimationSource | undefined => {
    const timeOfDay = isNight ? 'night' : 'day';
    return weatherConditionsTyped[timeOfDay][weatherCode.toString()];
  };

  const animation = getAnimation();

  return (
    <Card style={styles.animationCard}>
      <Card.Content>
        <Title style={styles.title}>Chance of Rain: {chanceOfRain * 100}%</Title>
        {animation ? (
          <LottieView source={animation} autoPlay loop style={styles.lottie} />
        ) : (
          <Paragraph>No animation available for this weather condition.</Paragraph>
        )}
      </Card.Content>
    </Card>
  );
};

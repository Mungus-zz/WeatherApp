import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/welcomescreen.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>It's Gon' Rain?</Title>
            <Paragraph style={styles.paragraph}>
              Here you can check the current weather, search for weather in different locations,
              and see a forecast for the next few days.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" style={styles.button} onPress={() => console.log('Pressed')}>Get Started</Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    width: 400,
    height: 400,
    alignSelf: 'center',
  },
  cardContainer: {
    justifyContent: 'flex-end',
  },
  card: {
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
  },
});

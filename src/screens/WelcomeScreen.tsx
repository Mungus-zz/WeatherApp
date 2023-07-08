import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar } from 'react-native-paper';

export const WelcomeScreen = () => {
  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Welcome" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>It's Gon' Rain?</Title>
          <Paragraph style={styles.paragraph}>
            Here you can check the current weather, search for weather in different locations,
            and see a forecast for the next few days.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} onPress={() => console.log('Pressed')}>Get Started</Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3F51B5',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3F51B5',
    color: '#FFFFFF',
  },
});

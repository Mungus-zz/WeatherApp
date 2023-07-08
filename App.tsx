import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LocalWeather } from './src/screens/LocalWeather';
import { SearchWeather } from './src/screens/SearchWeather';
import { Forecast } from './src/screens/Forecast';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LocalWeather" component={LocalWeather} />
        <Stack.Screen name="SearchWeather" component={SearchWeather} />
        <Stack.Screen name="Forecast" component={Forecast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

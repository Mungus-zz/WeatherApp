import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LocalWeather } from './src/screens/LocalWeather';
import { SearchWeather } from './src/screens/SearchWeather';
import { Forecast } from './src/screens/Forecast';

// Define the list of screens in your stack navigator
export type RootStackParamList = {
  WelcomeScreen: undefined;
  LocalWeather: undefined;
  SearchWeather: undefined;
  Forecast: undefined;
};

const Stack = createStackNavigator<RootStackParamList>(); // Pass the type

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen 
          name="WelcomeScreen" 
          component={WelcomeScreen} 
          options={{ headerShown: false }} // This line hides the header
        />
        <Stack.Screen name="LocalWeather"
         component={LocalWeather} 
         options={{ headerShown: false }}
         />
        <Stack.Screen name="SearchWeather" component={SearchWeather} />
        <Stack.Screen name="Forecast" component={Forecast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

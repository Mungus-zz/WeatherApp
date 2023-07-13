# weatherapp
Weather App initialized via Expo using react-native-svg, react-native-reanimated, react-native-paper

Weather App
This is a weather application built with React Native and TypeScript. It uses the OpenWeatherMap API to fetch weather data based on the user's location. The application provides a detailed view of the current weather conditions, including temperature, weather description, and the chance of rain.

Key Features
Location Search Bar: The application includes a search bar where users can input their location. The application fetches weather data for the specified location.

Weather Data Card: Once the weather data is fetched, it is displayed in a card format. The card includes information such as the current temperature, weather description, whether it's raining, and the chance of rain for the current hour.

Weather Animation Card: The application also includes an animation card that displays an animation based on the current weather condition. The animation changes depending on whether it's day or night and the current weather condition.

Error Handling: The application includes error handling mechanisms. If there's an error while fetching the weather data, a Snackbar component from the React Native Paper library is used to display an error message to the user.

Code Overview
The main component of the application is the LocalWeather component. This component uses the useWeatherStore hook to access the weather data from the global state. The fetchWeather function is used to fetch the weather data from the OpenWeatherMap API. The fetched data is then stored in the global state using the setWeatherData function from the useWeatherStore hook.

The LocalWeather component also includes logic to determine whether it's day or night based on the sunrise and sunset times from the fetched weather data. This information is used to display the appropriate animation in the AnimationCard component.

The WeatherDataCard and AnimationCard components are used to display the fetched weather data and the weather animation respectively. The LocationSearchBar component is used to input the location for which the weather data should be fetched.

The application uses the Snackbar component from the React Native Paper library to display error messages if there's an error while fetching the weather data.

The application's styles are defined in the styles.ts file using React Native's StyleSheet API.

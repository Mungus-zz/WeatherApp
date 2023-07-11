import React from 'react';
import { Searchbar } from 'react-native-paper';
import * as Location from 'expo-location';
import { getCoordinates } from '../../services/OpenWeatherMapAPI';

interface LocationSearchBarProps {
    onLocationChange: (latitude: number, longitude: number) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({ onLocationChange, searchQuery, setSearchQuery }) => {

  const fetchCurrentLocationWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    onLocationChange(location.coords.latitude, location.coords.longitude);
  };

  const fetchWeatherBySearchQuery = async () => {
    if (searchQuery) {
      try {
        const { lat, lon } = await getCoordinates(searchQuery);
        onLocationChange(lat, lon);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Searchbar
      placeholder="Search for a location"
      onChangeText={setSearchQuery}
      value={searchQuery}
      icon="crosshairs-gps"
      onIconPress={fetchCurrentLocationWeather}
      onSubmitEditing={fetchWeatherBySearchQuery} // fetch weather data when the user submits the search
    />
  );
};

export default LocationSearchBar;

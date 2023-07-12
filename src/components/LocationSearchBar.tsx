import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface LocationSearchBarProps {
    onLocationChange: (latitude: number, longitude: number) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({ onLocationChange }) => {
  const [autoUpdateLocation, setAutoUpdateLocation] = useState(true);

  const fetchCurrentLocationWeather = async () => {
    if (!autoUpdateLocation) {
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    onLocationChange(location.coords.latitude, location.coords.longitude);
  };

  const handleSelect = async (data: any, details: any = null) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      setAutoUpdateLocation(false);
      onLocationChange(lat, lng);
    }
  };

  return (
    <GooglePlacesAutocomplete
  placeholder='Search for a location'
  onPress={handleSelect}
  query={{
    key: GOOGLE_MAPS_API_KEY,
    language: 'en',
  }}
  nearbyPlacesAPI='GooglePlacesSearch'
  debounce={400}
  fetchDetails={true}
/>
  );
};

export default LocationSearchBar;

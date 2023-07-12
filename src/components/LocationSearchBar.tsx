import React, { useState, useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface LocationSearchBarProps {
    onLocationChange: (latitude: number, longitude: number) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({ onLocationChange }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      onLocationChange(location.coords.latitude, location.coords.longitude);
    })();
  }, [onLocationChange]);

  const handleSelect = async (data: any, details: any = null) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
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

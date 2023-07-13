import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface LocationSearchBarProps {
  onLocationChange: (latitude: number, longitude: number, cityName: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({ onLocationChange, setSearchQuery }) => {

  const fetchCurrentLocationWeather = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    onLocationChange(location.coords.latitude, location.coords.longitude, 'Current Location');
  };

  const handleSelect = async (data: any, details: any = null) => {
    if (details && details.geometry) {
      const { lat, lng } = details.geometry.location;
      const cityName = details.formatted_address; // Get the city name from the details object
      console.log(cityName); // Add this line
      onLocationChange(lat, lng, cityName); // Pass the city name as the third argument
      setSearchQuery(details.formatted_address); // Update the search query with the selected location
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
      styles={{
        textInputContainer: {
          marginBottom: 2, // Adjust this value as needed
        },
      }}
    />
  );
};
export default LocationSearchBar;

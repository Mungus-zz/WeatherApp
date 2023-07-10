import sunny from './sunny.json';
import thunderstorm from './thunderstorm.json';
import drizzle from './drizzle.json';
import partlyshower from './partlyshower.json';
import snow from './snow.json';
import cloudy from './cloudy.json';
import rainynight from './rainynight.json';
import snownight from './snownight.json';
import clearnight from './clearnight.json';
import cloudynight from './cloudynight.json';
import partlycloudy from './partlycloudy.json';
import misty from './misty.json';

export const weatherConditions = {
    day: {
      'Thunderstorm': thunderstorm,
      'Drizzle': drizzle,
      'Rain': partlyshower,
      'Snow': snow,
      'Clear': sunny,
      'Clear Sky': sunny, 
      'few clouds': partlycloudy,
      'scattered clouds': partlycloudy,
      'broken clouds': cloudy,
      'overcast clouds': cloudy,
      'Mist': misty,
    },
    night: {
      'Thunderstorm': thunderstorm,
      'Drizzle': drizzle,
      'Rain': rainynight,
      'Snow': snownight,
      'Clear': clearnight,
      'Clear Sky': clearnight, 
      'few clouds': partlycloudy,
      'scattered clouds': partlycloudy,
      'broken clouds': cloudynight,
      'overcast clouds': cloudynight,
      'Mist': misty,
    },
};

export type WeatherConditionCode = 'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Clear Sky' | 'few clouds' | 'scattered clouds' | 'broken clouds' | 'overcast clouds' | 'Mist';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { weatherStyles } from '../styles/WeatherStyles';

export const getWeatherDetails = (code) => {
  const weatherMapping = {
    0: { description: "Clear sky", icon: <MaterialCommunityIcons name="weather-sunny" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    1: { description: "Mainly clear", icon: <MaterialCommunityIcons name="weather-partly-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    2: { description: "Partly cloudy", icon: <MaterialCommunityIcons name="weather-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    3: { description: "Cloudy", icon: <MaterialCommunityIcons name="weather-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    45: { description: "Fog", icon: <MaterialCommunityIcons name="weather-fog" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    48: { description: "Depositing rime fog", icon: <MaterialCommunityIcons name="weather-fog" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    51: { description: "Light drizzle", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    53: { description: "Moderate drizzle", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    55: { description: "Dense drizzle", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    56: { description: "Light freezing drizzle", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    57: { description: "Dense freezing drizzle", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    61: { description: "Light rain", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    63: { description: "Moderate rain", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    65: { description: "Heavy rain", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    66: { description: "Light freezing rain", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    67: { description: "Heavy freezing rain", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    71: { description: "Light snow", icon: <MaterialCommunityIcons name="weather-snowy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    73: { description: "Moderate snow", icon: <MaterialCommunityIcons name="weather-snowy-heavy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    75: { description: "Heavy snow", icon: <MaterialCommunityIcons name="weather-snowy-heavy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    77: { description: "Snow grains", icon: <MaterialCommunityIcons name="weather-snowy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    80: { description: "Slight rain showers", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    81: { description: "Moderate rain showers", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    82: { description: "Violent rain showers", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    85: { description: "Slight snow showers", icon: <MaterialCommunityIcons name="weather-snowy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    86: { description: "Heavy snow showers", icon: <MaterialCommunityIcons name="weather-snowy-heavy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    95: { description: "Thunderstorm", icon: <MaterialCommunityIcons name="weather-lightning" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    96: { description: "Thunderstorm with light hail", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
    99: { description: "Thunderstorm with heavy hail", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
  };

  return weatherMapping[code] || { description: "Unknown weather", icon: <MaterialCommunityIcons name="weather-sunset" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> };
};

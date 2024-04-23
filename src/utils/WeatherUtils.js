import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherStyles } from "../styles/WeatherStyles";

export const getWeatherDetails = (code) => {
    const weatherMapping = {
        0: { description: "Clear sky", icon: <MaterialCommunityIcons name="weather-sunny" size={weatherStyles.iconSize} color={weatherStyles.iconColor}  /> },
        1: { description: "Mainly clear", icon: <MaterialCommunityIcons name="weather-partly-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        2: { description: "Partly cloudy", icon: <MaterialCommunityIcons name="weather-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        3: { description: "Cloudy", icon: <MaterialCommunityIcons name="weather-cloudy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        45: { description: "Fog", icon: <MaterialCommunityIcons name="weather-fog" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        61: { description: "Light rain", icon: <MaterialCommunityIcons name="weather-rainy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        63: { description: "Moderate rain", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        65: { description: "Heavy rain", icon: <MaterialCommunityIcons name="weather-pouring" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        71: { description: "Light snow", icon: <MaterialCommunityIcons name="weather-snowy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        73: { description: "Moderate snow", icon: <MaterialCommunityIcons name="weather-snowy-heavy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        75: { description: "Heavy snow", icon: <MaterialCommunityIcons name="weather-snowy-heavy" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        95: { description: "Thunderstorm", icon: <MaterialCommunityIcons name="weather-lightning" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
        96: { description: "Thunderstorm with hail", icon: <MaterialCommunityIcons name="weather-hail" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> },
      };
    
      return weatherMapping[code] || { description: "Unknown weather", icon: <MaterialCommunityIcons name="weather-sunset" size={weatherStyles.iconSize} color={weatherStyles.iconColor} /> };
};
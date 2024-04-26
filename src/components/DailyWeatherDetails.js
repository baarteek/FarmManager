import { Text, Touchable, View } from "react-native";
import { styles } from "../styles/AppStyles";
import { weatherStyles } from "../styles/WeatherStyles";
import { getWeatherDetails } from "../utils/WeatherUtils";
import { FontAwesome6, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const WeatherDailyDetails = ({dailyData, dailyUnits}) => {
    const getWeekdayFromDateString = (dateString) => {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString('en-En', { weekday: 'long' });
      }; 

    return (
        <>
            {
                dailyData.time.map((time, index) => {
                    const { icon, description } = getWeatherDetails(dailyData.weather_code[index]);
                    
                    return (
                        <View key={index} style={[styles.innerContainer, weatherStyles.innerContainer, {marginBottom: '8%'}]}>
                        {
                            dailyData.time[0] === time ? (
                                <Text style={[styles.subtitle,weatherStyles.subtitle]}>Today</Text>
                            ) : (
                                <Text style={[styles.subtitle,weatherStyles.subtitle]}>{getWeekdayFromDateString(time)}</Text>
                            )
                        }
                        <View style={styles.line} />
                            <View style={styles.rowContainer} >
                                <Text style={[styles.largeText, weatherStyles.largeText]}>{description}</Text>
                                {icon}
                            </View>
                            <View style={weatherStyles.line} />
                            <View style={styles.rowContainer}>
                                <FontAwesome6 name="temperature-arrow-down" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                <Text style={[styles.largeText, weatherStyles.largeText]}>{dailyData.temperature_2m_min[index]}{dailyUnits.temperature_2m_min}</Text>
                                <Text style={[styles.largeText, weatherStyles.largeText]}>-</Text>
                                <Text style={[styles.largeText, weatherStyles.largeText]}>{dailyData.temperature_2m_max[index]}{dailyUnits.temperature_2m_max}</Text>
                                <FontAwesome6 name="temperature-arrow-up" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                            </View>
                            <View style={weatherStyles.line} />
                            <View style={styles.rowContainer} >
                                <Feather name="cloud-rain" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                <Text style={[styles.largeText, weatherStyles.largeText]}>{dailyData.precipitation_probability_max[index]}{dailyUnits.precipitation_probability_max}</Text>
                                <Feather name="wind" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                <Text style={[styles.largeText, weatherStyles.largeText]}>{dailyData.wind_speed_10m_max[index]} {dailyUnits.wind_speed_10m_max}</Text>
                            </View>
                            <View style={weatherStyles.line} />
                            <TouchableOpacity style={{ borderWidth: 1, borderRadius: 25, borderColor: '#fff', paddingLeft: '20%', paddingRight: '20%', backgroundColor: '#c0ebfc' }}>
                                <Text style={[styles.subtitle, weatherStyles.subtitle, { fontSize: 18 }]}>Show Details</Text>
                            </TouchableOpacity>
                    </View>
                    );
                })
            }
        </>
    );
};

export default WeatherDailyDetails;
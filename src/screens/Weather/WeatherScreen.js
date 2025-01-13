import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import useWeatherData from "../../hooks/useWeatherData";
import { useLocationContext } from "../../context/LocationProvider";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { FontAwesome6, Feather, Entypo, Ionicons } from '@expo/vector-icons';
import { getWeatherDetails } from "../../utils/WeatherUtils";
import { weatherStyles } from "../../styles/WeatherStyles";
import DailyWeatherDetails from "../../components/DailyWeatherDetails";
import TodayWeatherDetails from "../../components/TodayWeatherDetails";


const WeatherScreen = () => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);


    if(!location && !locationError) {
        return (
            <ScrollView style={styles.mainCantainer} >
               <LoadingView
                    title="Loading location..."
                    activityIndicatorColor="#22532A"
                />
            </ScrollView>
        );
    } else if(locationError) {
        return (
            <ScrollView style={styles.mainCantainer} >
               <ErrorView title="Location Error" message={locationError}/>
            </ScrollView>
        );
    }

    if(loading) {
        return (
            <ScrollView style={styles.mainCantainer} >
                <LoadingView
                    title="Loading Weather..."
                    activityIndicatorColor="#22532A"
                />
            </ScrollView>
        );
    } else if(error) {
        return (
            <ScrollView style={styles.mainCantainer} >
               <ErrorView title="Weather Error" message={error}/>
            </ScrollView>
        );
    }

    const { icon, description } = getWeatherDetails(weatherData.current.weather_code);

    return (
            <ScrollView style={styles.mainCantainer}>
                <View style={styles.container} >
                    <View style={[styles.topContainer, weatherStyles.container]}>
                        <Text style={[styles.title, weatherStyles.title]}>Current Weather</Text>
                    </View>
                    <View style={[styles.bottomContainer, weatherStyles.container]} >
                        <View style={styles.content} >
                            <View style={[styles.innerContainer, weatherStyles.innerContainer]}>
                                <View style={styles.rowContainer} >
                                    <FontAwesome6 name="temperature-full" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.temperature_2m}{weatherData.current_units.temperature_2m}</Text>
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>{description}</Text>
                                    {icon}
                                </View>
                            </View>
                            <View style={[styles.innerContainer,weatherStyles.innerContainer]}>
                                <Text style={[styles.subtitle,weatherStyles.subtitle]}>Humidity</Text>
                                <View style={styles.rowContainer} >
                                    <Ionicons name="water" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.relative_humidity_2m}{weatherData.current_units.relative_humidity_2m}</Text>
                                </View>
                            </View>
                                <View style={[styles.innerContainer, weatherStyles.innerContainer]}>
                                    <Text style={[styles.subtitle, weatherStyles.subtitle]}>Wind</Text>
                                    <View style={styles.rowContainer} >
                                        <Feather name="wind" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                        <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}</Text>
                                        <Entypo name="direction" size={weatherStyles.iconSize} color={weatherStyles.iconColor} />
                                        <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.wind_direction_10m}{weatherData.current_units.wind_direction_10m}</Text>
                                    </View>
                                </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container} >
                    <View style={[styles.topContainer, weatherStyles.container]}>
                        <Text style={[styles.title, weatherStyles.title]}>Today's Weather</Text>
                    </View>
                    <View style={[styles.bottomContainer, weatherStyles.container]} >
                        <View style={styles.content} >
                            <TodayWeatherDetails hourlyData={weatherData.hourly} />
                        </View>
                    </View>
                </View>
                <View style={styles.container} >
                    <View style={[styles.topContainer, weatherStyles.container]}>
                        <Text style={[styles.title, weatherStyles.title]}>7-day Forecast</Text>
                    </View>
                    <View style={[styles.bottomContainer, weatherStyles.container]} >
                        <View style={styles.content} >
                            <DailyWeatherDetails dailyData={weatherData.daily} dailyUnits={weatherData.daily_units} />
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

export default WeatherScreen;
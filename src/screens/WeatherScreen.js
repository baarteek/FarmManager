import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { styles } from "../styles/AppStyles";
import useWeatherData from "../hooks/useWeatherData";
import { useLocationContext } from "../context/useLocationContext";
import LoadingView from "../components/LoadingView";
import ErrorView from "../components/ErrorView";
import { FontAwesome6, Feather, Entypo, Ionicons } from '@expo/vector-icons';


const WeatherScreen = () => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

    console.log(weatherData?.current);

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
                                    <FontAwesome6 name="temperature-full" size={26} color={weatherStyles.iconColor} />
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.temperature_2m}°C</Text>
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>Code: {weatherData.current.weather_code}</Text>
                                </View>
                            </View>
                            <View style={[styles.innerContainer,weatherStyles.innerContainer]}>
                                <Text style={[styles.subtitle,weatherStyles.subtitle]}>Humidity</Text>
                                <View style={styles.rowContainer} >
                                    <Ionicons name="water" size={24} color={weatherStyles.iconColor} />
                                    <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.relative_humidity_2m}%</Text>
                                </View>
                            </View>
                                <View style={[styles.innerContainer, weatherStyles.innerContainer]}>
                                    <Text style={[styles.subtitle, weatherStyles.subtitle]}>Wind</Text>
                                    <View style={styles.rowContainer} >
                                        <Feather name="wind" size={26} color={weatherStyles.iconColor} />
                                        <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.wind_speed_10m} m/s</Text>
                                        <Entypo name="direction" size={24} color={weatherStyles.iconColor} />
                                        <Text style={[styles.largeText, weatherStyles.largeText]}>{weatherData.current.wind_direction_10m}°</Text>
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
                            <Text style={styles.text}>Content</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container} >
                    <View style={[styles.topContainer, weatherStyles.container]}>
                        <Text style={[styles.title, weatherStyles.title]}>7-day Forecast</Text>
                    </View>
                    <View style={[styles.bottomContainer, weatherStyles.container]} >
                        <View style={styles.content} >
                            {location && (
                                <Text style={styles.text}>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
                            )}
                            {locationError && <Text style={styles.text}>{locationError}</Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

const weatherStyles = StyleSheet.create({
    title: {
        color: '#07374a'
    },
    container: {
        backgroundColor: '#c0ebfc'
    },
    innerContainer: {
        backgroundColor: '#98defa'
    },
    largeText: {
        color: '#0c4f69'
    },
    subtitle: {
        color: '#07374a'
    },
    iconColor: '#010361'
});

export default WeatherScreen;
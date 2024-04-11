import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/AppStyles";
import useLocation from "../hooks/useLocation";
import useWeatherData from "../hooks/useWeatherData";


const WeatherScreen = () => {
    const { location, locationEror } = useLocation();
    const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

    console.log(weatherData.daily);

    return (
            <ScrollView style={styles.mainCantainer}>
                <View style={styles.container} >
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Current Weather</Text>
                    </View>
                    <View style={styles.bottomContainer} >
                        <View style={styles.content} >
                            <Text style={styles.text}>Content</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container} >
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Today's Weather</Text>
                    </View>
                    <View style={styles.bottomContainer} >
                        <View style={styles.content} >
                            <Text style={styles.text}>Content</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container} >
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>7-day Forecast</Text>
                    </View>
                    <View style={styles.bottomContainer} >
                        <View style={styles.content} >
                            {location && (
                                <Text style={styles.text}>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
                            )}
                            {locationEror && <Text style={styles.text}>{locationEror}</Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

export default WeatherScreen;
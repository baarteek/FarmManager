import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { styles } from "../styles/AppStyles";
import useWeatherData from "../hooks/useWeatherData";
import { useLocationContext } from "../context/useLocationContext";
import LoadingView from "../components/LoadingView";


const WeatherScreen = () => {
    const { location, locationError } = useLocationContext();
    //const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

    //console.log(weatherData.daily);

    if(!location && !locationError) {
        return (
            <ScrollView style={styles.mainCantainer} >
               <LoadingView
                    title="Loading location..."
                    
                />
            </ScrollView>
        );
    }

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
                            {locationError && <Text style={styles.text}>{locationError}</Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

export default WeatherScreen;
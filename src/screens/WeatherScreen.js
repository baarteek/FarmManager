import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/AppStyles";
import useLocation from "../hooks/useLocation";

const WeatherScreen = ({navigation}) => {
    const {location, error} = useLocation();

    return (
            <ScrollView style={styles.mainCantainer}>
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
                            {error && <Text style={styles.text}>{error}</Text>}
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

export default WeatherScreen;
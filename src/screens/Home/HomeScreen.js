import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import { useLocationContext } from "../../context/LocationProvider";
import useWeatherData from "../../hooks/useWeatherData";

const HomeScreen = ({navigation}) => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

    return (
    <ScrollView style={styles.mainCantainer}>
        <Text>Home Screen</Text>
    </ScrollView>
    );
}

export default HomeScreen;
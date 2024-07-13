import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import ExpandableComponent from "../../components/ExpandableComponent";
import { weatherStyles } from "../../styles/WeatherStyles";
import TodayWeatherDetails from "../../components/TodayWeatherDetails";
import { useLocationContext } from "../../context/useLocationContext";
import useWeatherData from "../../hooks/useWeatherData";
import LoadingView from "../../components/LoadingView";
import WarningView from "../../components/WarningView";

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
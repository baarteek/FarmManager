import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import useWeatherData from "../../hooks/useWeatherData";
import { useLocationContext } from "../../context/LocationProvider";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { weatherStyles } from "../../styles/WeatherStyles";
import TodayWeatherDetails from "../../components/TodayWeatherDetails";
import { useHomePageInfoContext } from "../../context/HomePageInfoProvider";
import LatestOperations from "../../components/LatestOperations";  // Import nowego komponentu

const HomeScreen = () => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);
    const { homePageInfo, loading: infoLoading, error: infoError } = useHomePageInfoContext();

    if (!location && !locationError) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <LoadingView title="Loading location..." activityIndicatorColor="#22532A" />
            </ScrollView>
        );
    } else if (locationError) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <ErrorView title="Location Error" message={locationError} />
            </ScrollView>
        );
    }

    if (weatherLoading || infoLoading) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <LoadingView title="Loading data..." activityIndicatorColor="#22532A" />
            </ScrollView>
        );
    }

    if (weatherError || infoError) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <ErrorView title="Error" message={weatherError || infoError} />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.mainCantainer}>
            <View style={styles.container}>
                <View style={[styles.topContainer, weatherStyles.container]}>
                    <Text style={[styles.title, weatherStyles.title]}>Today's Weather</Text>
                </View>
                <View style={[styles.bottomContainer, weatherStyles.container]}>
                    <View style={styles.content}>
                        <TodayWeatherDetails hourlyData={weatherData.hourly} />
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={[styles.topContainer, styles.container]}>
                    <Text style={[styles.title, {fontSize: 25}]}>Latest Operations</Text>
                </View>
                <LatestOperations data={homePageInfo} />
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
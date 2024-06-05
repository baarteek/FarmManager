import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/AppStyles";
import ExpandableComponent from "../components/ExpandableComponent";
import { weatherStyles } from "../styles/WeatherStyles";
import TodayWeatherDetails from "../components/TodayWeatherDetails";
import { useLocationContext } from "../context/useLocationContext";
import useWeatherData from "../hooks/useWeatherData";
import LoadingView from "../components/LoadingView";
import WarningView from "../components/WarningView";

const HomeScreen = ({navigation}) => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading, error } = useWeatherData(location?.coords?.latitude, location?.coords?.longitude);

    return (
    <ScrollView style={styles.mainCantainer}>
        <WarningView title="Weather Alerts" message="Severe frost warning for the upcoming weekend. Consider protective measures for sensitive crops." />
        <WarningView title="Equipment Maintenance" message="You should perform maintenance on your Case Puma 215 vehicle" />
        {
            loading ? <LoadingView
                    title="Loading Weather..."
                    activityIndicatorColor="#22532A"
                /> :
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
        }
        <View style={styles.container}>
            <ExpandableComponent title="Upcoming Tasks">
                <ExpandableComponent title="Fertilization of Corn" backgroundColor="#BAF1BA" style={{width: '100%'}}>
                    <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Field Name:</Text>
                        <Text style={styles.text}>Field 1</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Date:</Text>
                        <Text style={styles.text}>April 10th, 2024</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <Text style={[styles.text, {fontWeight: 'bold', alignSelf: 'center'}]}>Description:</Text>
                    <Text style={[styles.text, {alignSelf: 'center'}]}>Apply NPK fertilizer to enhance growth. Use 150kg per hectare.</Text>
                </ExpandableComponent>
                <ExpandableComponent title="Wheat Spraying" backgroundColor="#BAF1BA" style={{width: '100%'}}>
                <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Field Name:</Text>
                        <Text style={styles.text}>Field 1</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Date:</Text>
                        <Text style={styles.text}>April 10th, 2024</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <Text style={[styles.text, {fontWeight: 'bold', alignSelf: 'center'}]}>Description:</Text>
                    <Text style={[styles.text, {alignSelf: 'center'}]}>Apply NPK fertilizer to enhance growth. Use 150kg per hectare.</Text>
                </ExpandableComponent>
                <ExpandableComponent title="Wheat Spraying" backgroundColor="#BAF1BA" style={{width: '100%'}}>
                <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Field Name:</Text>
                        <Text style={styles.text}>Field 1</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.text, {fontWeight: 'bold'}]}>Date:</Text>
                        <Text style={styles.text}>April 10th, 2024</Text>
                    </View>
                    <View style={[styles.line, {borderColor: '#DFF6DF', marginTop: '2%', marginBottom: '2%'}]} />
                    <Text style={[styles.text, {fontWeight: 'bold', alignSelf: 'center'}]}>Description:</Text>
                    <Text style={[styles.text, {alignSelf: 'center'}]}>Apply NPK fertilizer to enhance growth. Use 150kg per hectare.</Text>
                </ExpandableComponent>
            </ExpandableComponent>
        </View>
    </ScrollView>
    );
}

export default HomeScreen;
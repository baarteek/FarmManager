import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/AppStyles";

const WeatherScreen = ({navigation}) => {
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
                            <Text style={styles.text}>Content</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
    );
};

export default WeatherScreen;
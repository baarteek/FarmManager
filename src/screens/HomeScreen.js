import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/AppStyles";
import ExpandableComponent from "../components/ExpandableComponent";

const HomeScreen = ({navigation}) => {
    return (
    <SafeAreaView style={styles.mainCantainer}>
        <View style={styles.container}>
            <ExpandableComponent title="Weather Alerts">
                <Text>Contente</Text>
            </ExpandableComponent>
        </View>
    </SafeAreaView>
    );
}

export default HomeScreen;
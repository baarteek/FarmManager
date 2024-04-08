import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CropManagementScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{felx: 1, alignItems:'center', justifyContent: 'center'}}>
            <Text style={{margin: '20%'}}>Crop Management</Text>
        </SafeAreaView>
        );
};

export default CropManagementScreen;
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddFieldScreen = ({navigation}) => {
    return (
        <SafeAreaView style={{felx: 1, alignItems:'center', justifyContent: 'center'}}>
            <Text style={{margin: '20%'}}>AddFieldScreen</Text>
        </SafeAreaView>
        );
};

export default AddFieldScreen;
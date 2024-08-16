import { createStackNavigator } from "@react-navigation/stack";
import FarmManagementScreen from "../screens/FarmManagement/FarmManagementScreen";
import { FarmProvider } from "../context/FarmProvider";

const Stack = createStackNavigator();

const FarmManagementStack = () => {
    return (
        <FarmProvider>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        borderBottomWidth: 2,
                    },
                    headerTintColor: '#276e33',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 18
                    },
                    drawerActiveBackgroundColor: '#276e33',
                    drawerActiveTintColor: '#276e33'
                }}
            >
                <Stack.Screen name="FarmManagementMain" component={FarmManagementScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </FarmProvider>
    )
};

export default FarmManagementStack
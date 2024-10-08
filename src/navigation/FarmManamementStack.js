import { createStackNavigator } from "@react-navigation/stack";
import FarmManagementScreen from "../screens/FarmManagement/FarmManagementScreen";
import { FarmProvider } from "../context/FarmProvider";
import AddFarmScreen from "../screens/FarmManagement/AddFarmScreen";
import FarmEditScreen from "../screens/FarmManagement/FarmEditScreen";
import AddFieldScreen from "../screens/FieldManagement/AddFieldScreen"
import EditFieldScreen from "../screens/FieldManagement/EditFieldScreen";
import { FieldProvider } from "../context/FieldProvider";

const Stack = createStackNavigator();

const FarmManagementStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
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
                    <Stack.Screen name="Add Farm" component={AddFarmScreen} />
                    <Stack.Screen name="Edit Farm" component={FarmEditScreen} />
                    <Stack.Screen name="Add Field" component={AddFieldScreen} />
                    <Stack.Screen name="Edit Field" component={EditFieldScreen} />
                </Stack.Navigator>
            </FieldProvider>
        </FarmProvider>
    )
};

export default FarmManagementStack
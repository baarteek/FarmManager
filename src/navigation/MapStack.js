import { createStackNavigator } from "@react-navigation/stack";
import FarmManagementScreen from "../screens/FarmManagement/FarmManagementScreen";
import { FarmProvider } from "../context/FarmProvider";
import AddFarmScreen from "../screens/FarmManagement/AddFarmScreen";
import FarmEditScreen from "../screens/FarmManagement/FarmEditScreen";
import AddFieldScreen from "../screens/FieldManagement/AddFieldScreen"
import EditFieldScreen from "../screens/FieldManagement/EditFieldScreen";
import { FieldProvider } from "../context/FieldProvider";
import { MapProvider } from "../context/MapProvider";
import MapScreen from "../screens/Map/MapScreen";

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <MapProvider>
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
                    <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
        </MapProvider>
    )
};

export default MapStack;
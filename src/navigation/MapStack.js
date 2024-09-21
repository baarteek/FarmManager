import { createStackNavigator } from "@react-navigation/stack";;
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
                    <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
        </MapProvider>
    )
};

export default MapStack;
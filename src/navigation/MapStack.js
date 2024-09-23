import { createStackNavigator } from "@react-navigation/stack";;
import { MapProvider } from "../context/MapProvider";
import MapScreen from "../screens/Map/MapScreen";
import AddSoilMeasurementScreen from '../screens/FieldManagement/AddSoilMeasurementScreen';
import AddPlantProtectionScreen from '../screens/CropManagement/AddPlantProtectionScreen';
import AddFertilizationScreen from '../screens/CropManagement/AddFertilizationScreen';
import { PlantProtectionProvider } from "../context/PlantProtectionProvider";
import { FertilizationProvider } from "../context/FertilizationProvider";
import { SoilMeasurementProvider } from "../context/SoilMeasurementProvider";

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <MapProvider>
            <SoilMeasurementProvider>
                <PlantProtectionProvider>
                    <FertilizationProvider>
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
                            <Stack.Screen name="AddPlantProtection" component={AddPlantProtectionScreen} options={{ headerShown: true, title:'Add Plant Protection' }} />
                            <Stack.Screen name="AddFertilization" component={AddFertilizationScreen} options={{ headerShown: true, title: 'Add Fertilization' }} />
                            <Stack.Screen name='AddSoilMeasurement' component={AddSoilMeasurementScreen} options={{headerShown: true, title: 'Add Soil Measurement'}} />
                        </Stack.Navigator>
                    </FertilizationProvider>
                </PlantProtectionProvider>
            </SoilMeasurementProvider>
        </MapProvider>
    )
};

export default MapStack;
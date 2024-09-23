import { createStackNavigator } from "@react-navigation/stack";;
import { MapProvider } from "../context/MapProvider";
import MapScreen from "../screens/Map/MapScreen";
import AddSoilMeasurementScreen from '../screens/FieldManagement/AddSoilMeasurementScreen';
import AddPlantProtectionScreen from '../screens/CropManagement/AddPlantProtectionScreen';
import AddFertilizationScreen from '../screens/CropManagement/AddFertilizationScreen';
import { PlantProtectionProvider } from "../context/PlantProtectionProvider";
import { FertilizationProvider } from "../context/FertilizationProvider";
import { SoilMeasurementProvider } from "../context/SoilMeasurementProvider";
import FieldDetailsScreen from "../screens/Map/FieldDetailsScreen";
import { FieldProvider } from "../context/FieldProvider";
import { CropProvider } from "../context/CropProvider";
import { PlotNumberProvider } from "../context/PlotNumberProvider";
import AddPlotNumberScreen from "../screens/FieldManagement/AddPlotNumberScreen";
import EditFieldScreen from "../screens/FieldManagement/EditFieldScreen";

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <FieldProvider>
            <CropProvider>
                <MapProvider>
                    <PlotNumberProvider>
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
                                        <Stack.Screen name="Map Screen" component={MapScreen} options={{ headerShown: false, title:'Map' }} />
                                        <Stack.Screen name="Add Plant Protection" component={AddPlantProtectionScreen} options={{ headerShown: true, title:'Add Plant Protection' }} />
                                        <Stack.Screen name="Add Fertilization" component={AddFertilizationScreen} options={{ headerShown: true, title: 'Add Fertilization' }} />
                                        <Stack.Screen name='Add Soil Measurement' component={AddSoilMeasurementScreen} options={{headerShown: true, title: 'Add Soil Measurement'}} />
                                        <Stack.Screen name='Field Details' component={FieldDetailsScreen} options={{headerShown: true, title: 'Field Details'}} />
                                        <Stack.Screen name='Add Plot Number' component={AddPlotNumberScreen} options={{headerShown: true, title: 'Add Plot Number'}} />
                                        <Stack.Screen name="Edit Field" component={EditFieldScreen} options={{ headerShown: true, title: 'Edit Field' }} />
                                    </Stack.Navigator>
                                </FertilizationProvider>
                            </PlantProtectionProvider>
                        </SoilMeasurementProvider>
                    </PlotNumberProvider>
                </MapProvider>
            </CropProvider>
        </FieldProvider>
    )
};

export default MapStack;
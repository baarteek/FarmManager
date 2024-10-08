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
import CropDetailsScreen from "../screens/Map/CropDetailsScreen";
import EditCropScreen from "../screens/CropManagement/EditCropScreen";
import EditFertilizationScreen from "../screens/CropManagement/EditFertilizationScreen";
import EditPlantProtectionScreen from "../screens/CropManagement/EditPlantProtectionScreen";
import { CultivationOperationProvider } from "../context/CultivationOperationProvider";
import AddCultivationOperationScreen from "../screens/CropManagement/AddCultivationOperationScreen";
import { FarmProvider } from "../context/FarmProvider";

const Stack = createStackNavigator();

const MapStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
                <CropProvider>
                    <MapProvider>
                        <CultivationOperationProvider>
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
                                                <Stack.Screen name="Crop Details" component={CropDetailsScreen} options={{ headerShown: true, title: 'Crop Details' }} />
                                                <Stack.Screen name='Add Plot Number' component={AddPlotNumberScreen} options={{headerShown: true, title: 'Add Plot Number'}} />
                                                <Stack.Screen name="Edit Field" component={EditFieldScreen} options={{ headerShown: true, title: 'Edit Field' }} />
                                                <Stack.Screen name="Edit Crop" component={EditCropScreen} options={{ headerShown: true, title: 'Edit Crop' }} />
                                                <Stack.Screen name="Edit Fertilization" component={EditFertilizationScreen} options={{ headerShown: true, title: 'Edit Fertilization' }} />
                                                <Stack.Screen name="Edit Plant Protection" component={EditPlantProtectionScreen} options={{ headerShown: true, title: 'Edit Plant Protection' }} />
                                                <Stack.Screen name="Add Cultivation Operation" component={AddCultivationOperationScreen} options={{ headerShown: true, title: 'Add Cultivation Operation' }} />
                                            </Stack.Navigator>
                                        </FertilizationProvider>
                                    </PlantProtectionProvider>
                                </SoilMeasurementProvider>
                            </PlotNumberProvider>
                        </CultivationOperationProvider>
                    </MapProvider>
                </CropProvider>
            </FieldProvider>
        </FarmProvider>
    )
};

export default MapStack;
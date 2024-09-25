import { createStackNavigator } from '@react-navigation/stack';
import CropManagementScreen from '../screens/CropManagement/CropManagementScreen';
import AddCropScreen from '../screens/CropManagement/AddCropScreen';
import EditCropScreen from '../screens/CropManagement/EditCropScreen';
import { CropProvider } from '../context/CropProvider'; 
import { FieldProvider } from '../context/FieldProvider';
import { FarmProvider } from '../context/FarmProvider';
import { FertilizationProvider } from '../context/FertilizationProvider';
import AddFertilizationScreen from '../screens/CropManagement/AddFertilizationScreen';
import EditFertilizationScreen from '../screens/CropManagement/EditFertilizationScreen';
import { PlantProtectionProvider } from '../context/PlantProtectionProvider';
import AddPlantProtectionScreen from '../screens/CropManagement/AddPlantProtectionScreen';
import EditPlantProtectionScreen from '../screens/CropManagement/EditPlantProtectionScreen';
import { CultivationOperationProvider } from '../context/CultivationOperationProvider';
import AddCultivationOperationScreen from '../screens/CropManagement/AddCultivationOperationScreen';
import EditCultivationOperationScreen from '../screens/CropManagement/EditCultivationOperationScreen';

const Stack = createStackNavigator();

const CropManagementStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
                <CropProvider>
                    <CultivationOperationProvider>
                        <FertilizationProvider>
                            <PlantProtectionProvider>
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
                                    <Stack.Screen name="CropManagementMain" component={CropManagementScreen} options={{ headerShown: false }} />
                                    <Stack.Screen name="Add Crop" component={AddCropScreen} options={{ headerShown: true, title: 'Add Crop' }} />
                                    <Stack.Screen name="Edit Crop" component={EditCropScreen} options={{ headerShown: true, title: 'Edit Crop' }} />
                                    <Stack.Screen name="Add Fertilization" component={AddFertilizationScreen} options={{ headerShown: true, title: 'Add Fertilization' }} />
                                    <Stack.Screen name="Edit Fertilization" component={EditFertilizationScreen} options={{ headerShown: true, title: 'Edit Fertilization' }} />
                                    <Stack.Screen name="Add Plant Protection" component={AddPlantProtectionScreen} options={{ headerShown: true, title:'Add Plant Protection' }} />
                                    <Stack.Screen name="Edit Plant Protection" component={EditPlantProtectionScreen} options={{ headerShown: true, title: 'Edit Plant Protection' }} />
                                    <Stack.Screen name="Add Cultivation Operation" component={AddCultivationOperationScreen} options={{ headerShown: true, title: 'Add Cultivation Operation' }} />
                                    <Stack.Screen name="Edit Cultivation Operation" component={EditCultivationOperationScreen} options={{ headerShown: true, title: 'Edit Cultivation Operation' }} />
                                </Stack.Navigator>
                            </PlantProtectionProvider>
                        </FertilizationProvider>
                    </CultivationOperationProvider>
                </CropProvider>
            </FieldProvider>
        </FarmProvider>
    );
};

export default CropManagementStack;

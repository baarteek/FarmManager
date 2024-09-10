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

const Stack = createStackNavigator();

const CropManagementStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
                <CropProvider>
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
                            <Stack.Screen name="CropManagementMain" component={CropManagementScreen} options={{ headerShown: false }} />
                            <Stack.Screen name="Add Crop" component={AddCropScreen} options={{ headerShown: true, title: 'Add Crop' }} />
                            <Stack.Screen name="Edit Crop" component={EditCropScreen} options={{ headerShown: true, title: 'Edit Crop' }} />
                            <Stack.Screen name="Add Fertilization" component={AddFertilizationScreen} options={{ headerShown: true, title: 'Add Fertilization' }} />
                            <Stack.Screen name="Edit Fertilization" component={EditFertilizationScreen} options={{ headerShown: true, title: 'Edit Fertilization' }} />
                        </Stack.Navigator>
                    </FertilizationProvider>
                </CropProvider>
            </FieldProvider>
        </FarmProvider>
    );
};

export default CropManagementStack;

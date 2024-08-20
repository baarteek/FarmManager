import { createStackNavigator } from '@react-navigation/stack';
import FieldManagementScreen from '../screens/FieldManagement/FieldManagementScreen';
import AddFieldScreen from '../screens/FieldManagement/AddFieldScreen';
import ShowCropsScreen from '../screens/CropManagement/ShowCropsScreen';
import EditFieldScreen from '../screens/FieldManagement/EditFieldScreen';
import AddCropScreen from '../screens/CropManagement/AddCropScreen';
import EditCropScreen from '../screens/CropManagement/EditCropScreen';
import { FieldProvider } from '../context/FieldProvider';
import AddSoilMeasurementScreen from '../screens/FieldManagement/AddSoilMeasurementScreen';
import EditSoilMeasurementScreen from '../screens/FieldManagement/EditSoilMeasurementScreen';
import AddFertilizationScreen from '../screens/CropManagement/AddFertilizationScreen';
import EditFertilizationScreen from '../screens/CropManagement/EditFertilizationScreen';
import { FarmProvider } from '../context/FarmProvider';


const Stack = createStackNavigator();

const FieldmanagementStack = () => {
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
                    <Stack.Screen name="FieldManagementMain" component={FieldManagementScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Add Field" component={AddFieldScreen} options={{ headerShown: true, title: 'Add Field' }} />
                    <Stack.Screen name="Show Crops" component={ShowCropsScreen} />
                    <Stack.Screen name="Edit Field" component={EditFieldScreen} options={{ headerShown: true, title: 'Edit Field' }} />
                    <Stack.Screen name='Add Crop' component={AddCropScreen} options={{headerShown: true, title: 'Add Crop'}} />
                    <Stack.Screen name='Edit Crop' component={EditCropScreen} options={{headerShown: true, title: 'Edit Crop'}} />
                    <Stack.Screen name='Add Soil Measurement' component={AddSoilMeasurementScreen} options={{headerShown: true, title: 'Add Soil Measurement'}} />
                    <Stack.Screen name='Edit Soil Measurement' component={EditSoilMeasurementScreen} options={{headerShown: true, title: 'Edit Soil Measurement'}} />
                    <Stack.Screen name="Add Fertilization" component={AddFertilizationScreen} options={{ headerShown: true, title: 'Add Fertilization' }} />
                    <Stack.Screen name="Edit Fertilization" component={EditFertilizationScreen} options={{ headerShown: true, title: 'Edit Fertilization' }} />
                </Stack.Navigator>
            </FieldProvider>
        </FarmProvider>
    );
};

export default FieldmanagementStack;

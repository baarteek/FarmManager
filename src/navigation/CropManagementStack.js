import { createStackNavigator } from '@react-navigation/stack';
import CropManagementScreen from '../screens/CropManagement/CropManagementScreen';
import AddCropScreen from '../screens/CropManagement/AddCropScreen';
import EditCropScreen from '../screens/CropManagement/EditCropScreen';
import { CropProvider } from '../context/CropProvider'; 
import { FieldProvider } from '../context/FieldProvider';
import { FarmProvider } from '../context/FarmProvider';

const Stack = createStackNavigator();

const CropManagementStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
                <CropProvider>
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
                    </Stack.Navigator>
                </CropProvider>
            </FieldProvider>
        </FarmProvider>
    );
};

export default CropManagementStack;

import { createStackNavigator } from '@react-navigation/stack';
import FieldManagementScreen from '../screens/FieldManagement/FieldManagementScreen';
import AddFieldScreen from '../screens/FieldManagement/AddFieldScreen';
import ShowCropsScreen from '../screens/FieldManagement/ShowCropsScreen';
import EditFieldScreen from '../screens/FieldManagement/EditFieldScreen';
import AddCropScreen from '../screens/FieldManagement/AddCropScreen';
import EditCropScreen from '../screens/FieldManagement/EditCropScreen';
import { FieldProvider } from '../context/FieldProvider';

const Stack = createStackNavigator();

const FieldmanagementStack = () => {
    return (
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
            </Stack.Navigator>
        </FieldProvider>
    );
};

export default FieldmanagementStack;

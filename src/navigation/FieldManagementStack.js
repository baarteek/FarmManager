import { createStackNavigator } from '@react-navigation/stack';
import FieldManagementScreen from '../screens/FieldManagement/FieldManagementScreen';
import AddFieldScreen from '../screens/FieldManagement/AddFieldScreen';
import ShowCropsScreen from '../screens/CropManagement/ShowCropsScreen';
import EditFieldScreen from '../screens/FieldManagement/EditFieldScreen';
import { FieldProvider } from '../context/FieldProvider';
import AddSoilMeasurementScreen from '../screens/FieldManagement/AddSoilMeasurementScreen';
import EditSoilMeasurementScreen from '../screens/FieldManagement/EditSoilMeasurementScreen';
import { FarmProvider } from '../context/FarmProvider';
import { SoilMeasurementProvider } from '../context/SoilMeasurementProvider';
import { PlotNumberProvider } from '../context/PlotNumberProvider';
import AddPlotNumberScreen from '../screens/FieldManagement/AddPlotNumberScreen';
import EditPlotNumberScreen from '../screens/FieldManagement/EditPlotNumberScreen';


const Stack = createStackNavigator();

const FieldmanagementStack = () => {
    return (
        <FarmProvider>
            <FieldProvider>
                <SoilMeasurementProvider>
                    <PlotNumberProvider>
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
                            <Stack.Screen name='Add Soil Measurement' component={AddSoilMeasurementScreen} options={{headerShown: true, title: 'Add Soil Measurement'}} />
                            <Stack.Screen name='Edit Soil Measurement' component={EditSoilMeasurementScreen} options={{headerShown: true, title: 'Edit Soil Measurement'}} />
                            <Stack.Screen name='Add Plot Number' component={AddPlotNumberScreen} options={{headerShown: true, title: 'Add Plot Number'}} />
                            <Stack.Screen name='Edit Plot Number' component={EditPlotNumberScreen} options={{headerShown: true, title: 'Edit Plot Number'}} />
                        </Stack.Navigator>
                    </PlotNumberProvider>
                </SoilMeasurementProvider>
            </FieldProvider>
        </FarmProvider>
    );
};

export default FieldmanagementStack;

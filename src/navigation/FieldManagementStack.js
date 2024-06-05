import { createStackNavigator } from '@react-navigation/stack';
import FieldManagementScreen from '../screens/FieldManagementScreen';
import AddFieldScreen from '../screens/AddFieldScreen';
import ShowCropsScreen from '../screens/ShowCropsScreen';

const Stack = createStackNavigator();

const FieldmanagementStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Field Management" component={FieldManagementScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Add Field" component={AddFieldScreen} />
            <Stack.Screen name="Show Crops" component={ShowCropsScreen} />
        </Stack.Navigator>
    );
};

export default FieldmanagementStack;

import { createStackNavigator } from '@react-navigation/stack';
import FieldManagementScreen from '../screens/FieldManagementScreen';
import AddFieldScreen from '../screens/AddFieldScreen';
import ShowCropsScreen from '../screens/ShowCropsScreen';

const Stack = createStackNavigator();

const FieldmanagementStack = () => {
    return (
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
            <Stack.Screen name="FieldManagementMain" component={FieldManagementScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Add Field" component={AddFieldScreen} options={{ headerShown: true, title: 'Add Field' }}/>
            <Stack.Screen name="Show Crops" component={ShowCropsScreen} />
        </Stack.Navigator>
    );
};

export default FieldmanagementStack;

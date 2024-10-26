import { createStackNavigator } from '@react-navigation/stack';
import ReportsScreen from '../screens/Reports/ReportsScreen';
import ReportsProvider from '../context/ReportsProvider';
import { FarmProvider } from '../context/FarmProvider';

const Stack = createStackNavigator();

const ReportsStack = () => {
    return (
        <FarmProvider>
            <ReportsProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            borderBottomWidth: 2,
                        },
                        headerTintColor: '#276e33',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 18,
                        },
                        drawerActiveBackgroundColor: '#276e33',
                        drawerActiveTintColor: '#276e33'
                    }}
                >
                    <Stack.Screen name='ReportsMain' component={ReportsScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </ReportsProvider>
        </FarmProvider>
    );
};

export default ReportsStack;
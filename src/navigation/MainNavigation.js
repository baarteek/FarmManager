import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from '../screens/Home/HomeScreen';
import WeatherScreen from '../screens/Weather/WeatherScreen';
import FieldmanagementStack from './FieldManagementStack';
import CropManagementScreen from '../screens/FieldManagement/CropManagementScreen';
import MapScreen from '../screens/Map/MapScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import CalculatorListScreen from '../screens/Calculators/CalculatorListScreen';

const Drawer = createDrawerNavigator();

const MainNavigation = () => {
    return (
        <Drawer.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    borderBottomWidth: 2,
                },
                headerTintColor: '#22532A',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22
                },
                drawerActiveBackgroundColor: '#DFF6DF',
                drawerActiveTintColor: '#22532A'
            }}
        >
            <Drawer.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Drawer.Screen 
                name="Weather"
                component={WeatherScreen}
            />
            <Drawer.Screen
                name="Field Management"
                component={FieldmanagementStack}
            />
            <Drawer.Screen
                name="Crop Management"
                component={CropManagementScreen}
            />
            <Drawer.Screen
                name="Map"
                component={MapScreen}
            />
            <Drawer.Screen
                name='Calculators'
                component={CalculatorListScreen}
            />
            <Drawer.Screen 
                name='Settings'
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
};

export default MainNavigation;
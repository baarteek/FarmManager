import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import WeatherScreen from "../screens/WeatherScreen";
import CropManagementScreen from "../screens/CropManagementScreen";
import MapScreen from "../screens/MapScreen";

const Drawer = createDrawerNavigator();

const MainNavigation = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Drawer.Screen 
                name="Weather"
                component={WeatherScreen}
            />
            <Drawer.Screen
                name="CropManagement"
                component={CropManagementScreen}
            />
            <Drawer.Screen
                name="Map"
                component={MapScreen}
            />
        </Drawer.Navigator>
    );
};

export default MainNavigation;
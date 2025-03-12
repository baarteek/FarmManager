import 'react-native-gesture-handler';
import { createDrawerNavigator } from "@react-navigation/drawer";
import FieldmanagementStack from './FieldManagementStack';
import FarmManagementStack from './FarmManamementStack';
import CropManagementStack from './CropManagementStack';
import CalculatorsStack from './CalculatorsStack';
import MapStack from './MapStack';
import ReportsStack from './ReportsStack';

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
                name="Farm Management"
                component={FarmManagementStack}
                options={{ title: "Zarządzanie Gospodarstwem" }}
            />
            <Drawer.Screen
                name="Field Management"
                component={FieldmanagementStack}
                options={{ title: "Zarządzanie Polami" }}
            />
            <Drawer.Screen
                name="Crop Management"
                component={CropManagementStack}
                options={{ title: "Zarządzanie Uprawami" }}
            />
            <Drawer.Screen
                name="Map"
                component={MapStack}
                options={{ title: "Mapa" }}
            />
            <Drawer.Screen
                name="Reports"
                component={ReportsStack}
                options={{ title: "Raporty" }}
            />
            <Drawer.Screen
                name="Calculators"
                component={CalculatorsStack}
                options={{ title: "Kalkulatory" }}
            />
        </Drawer.Navigator>
    );
};

export default MainNavigation;
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "../screens/Map/MapScreen";
import DodajPomiaryGlebyScreen from '../screens/FieldManagement/AddSoilMeasurementScreen';
import DodajOchroneRoslinScreen from '../screens/CropManagement/AddPlantProtectionScreen';
import DodajNawozenieScreen from '../screens/CropManagement/AddFertilizationScreen';
import SzczegolyPolaScreen from "../screens/Map/FieldDetailsScreen";
import DodajNumerDzialkiScreen from "../screens/FieldManagement/AddPlotNumberScreen";
import EdytujPoleScreen from "../screens/FieldManagement/EditFieldScreen";
import SzczegolyUprawyScreen from "../screens/Map/CropDetailsScreen";
import EdytujUpraweScreen from "../screens/CropManagement/EditCropScreen";
import EdytujNawozenieScreen from "../screens/CropManagement/EditFertilizationScreen";
import EdytujOchroneRoslinScreen from "../screens/CropManagement/EditPlantProtectionScreen";
import DodajOperacjeUprawowaScreen from "../screens/CropManagement/AddCultivationOperationScreen";
import EdytujPomiaryGlebyScreen from "../screens/FieldManagement/EditSoilMeasurementScreen";
import EdytujNumerDzialkiScreen from "../screens/FieldManagement/EditPlotNumberScreen";

const Stack = createStackNavigator();

const MapStack = () => {
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
            <Stack.Screen 
                name="Mapa" 
                component={MapScreen} 
                options={{ headerShown: false, title: 'Mapa' }} 
            />
            <Stack.Screen 
                name="Dodaj Ochronę Roślin" 
                component={DodajOchroneRoslinScreen} 
                options={{ headerShown: true, title: 'Dodaj ochronę roślin' }} 
            />
            <Stack.Screen 
                name="Dodaj Nawożenie" 
                component={DodajNawozenieScreen} 
                options={{ headerShown: true, title: 'Dodaj nawożenie' }} 
            />
            <Stack.Screen 
                name='Dodaj Pomiary Gleby' 
                component={DodajPomiaryGlebyScreen} 
                options={{ headerShown: true, title: 'Dodaj pomiary gleby' }} 
            />
            <Stack.Screen 
                name='Edytuj Pomiary Gleby' 
                component={EdytujPomiaryGlebyScreen} 
                options={{ headerShown: true, title: 'Edytuj pomiary gleby' }} 
            />
            <Stack.Screen 
                name='Szczegóły Pola' 
                component={SzczegolyPolaScreen} 
                options={{ headerShown: true, title: 'Szczegóły pola' }} 
            />
            <Stack.Screen 
                name="Szczegóły Uprawy" 
                component={SzczegolyUprawyScreen} 
                options={{ headerShown: true, title: 'Szczegóły uprawy' }} 
            />
            <Stack.Screen 
                name='Dodaj Numer Działki' 
                component={DodajNumerDzialkiScreen} 
                options={{ headerShown: true, title: 'Dodaj numer działki' }} 
            />
            <Stack.Screen 
                name='Edytuj Numer Działki' 
                component={EdytujNumerDzialkiScreen} 
                options={{ headerShown: true, title: 'Edytuj numer działki' }} 
            />
            <Stack.Screen 
                name="Edytuj Pole" 
                component={EdytujPoleScreen} 
                options={{ headerShown: true, title: 'Edytuj pole' }} 
            />
            <Stack.Screen 
                name="Edytuj Uprawę" 
                component={EdytujUpraweScreen} 
                options={{ headerShown: true, title: 'Edytuj uprawę' }} 
            />
            <Stack.Screen 
                name="Edytuj Nawożenie" 
                component={EdytujNawozenieScreen} 
                options={{ headerShown: true, title: 'Edytuj nawożenie' }} 
            />
            <Stack.Screen 
                name="Edytuj Ochronę Roślin" 
                component={EdytujOchroneRoslinScreen} 
                options={{ headerShown: true, title: 'Edytuj ochronę roślin' }} 
            />
            <Stack.Screen 
                name="Dodaj Operację Uprawową" 
                component={DodajOperacjeUprawowaScreen} 
                options={{ headerShown: true, title: 'Dodaj operację uprawową' }} 
            />
        </Stack.Navigator>
    );
};

export default MapStack;
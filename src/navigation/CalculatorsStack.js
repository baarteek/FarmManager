import { createStackNavigator } from '@react-navigation/stack';
import CropManagementScreen from '../screens/CropManagement/CropManagementScreen';
import AddCropScreen from '../screens/CropManagement/AddCropScreen';
import EditCropScreen from '../screens/CropManagement/EditCropScreen';
import { CropProvider } from '../context/CropProvider'; 
import { FieldProvider } from '../context/FieldProvider';
import { FarmProvider } from '../context/FarmProvider';
import { FertilizationProvider } from '../context/FertilizationProvider';
import AddFertilizationScreen from '../screens/CropManagement/AddFertilizationScreen';
import EditFertilizationScreen from '../screens/CropManagement/EditFertilizationScreen';
import { PlantProtectionProvider } from '../context/PlantProtectionProvider';
import AddPlantProtectionScreen from '../screens/CropManagement/AddPlantProtectionScreen';
import EditPlantProtectionScreen from '../screens/CropManagement/EditPlantProtectionScreen';
import CalculatorListScreen from '../screens/Calculators/CalculatorListScreen';
import SeedingRateCalculator from '../screens/Calculators/SeedingRateCalculator';

const Stack = createStackNavigator();

const CalculatorsStack = () => {
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
                <Stack.Screen name="CalculatorList" component={CalculatorListScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SeedingRateCalculator" component={SeedingRateCalculator} options={{ headerShown: true, title: 'Seeding Rate Calculator' }} />
        </Stack.Navigator>
    );
};

export default CalculatorsStack;

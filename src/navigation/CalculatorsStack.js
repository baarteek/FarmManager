import { createStackNavigator } from '@react-navigation/stack';
import CalculatorListScreen from '../screens/Calculators/CalculatorListScreen';
import SeedingRateCalculatorScreen from '../screens/Calculators/SeedingRateCalculatorScreen';
import PlantDensityCalculatorScreen from '../screens/Calculators/PlantDensityCalculatorScreen';
import SowingDensityCalculatorScreen from '../screens/Calculators/SowingDensityCalculatorScreen';
import CropProtectionCalculatorScreen from '../screens/Calculators/CropProtectionCalculatorScreen';
import FertilizationCalculatorScreen from '../screens/Calculators/FertilizationCalculatorScreen';
import PlantWaterNeedsCalculatorScreen from '../screens/Calculators/PlantWaterNeedsCalculatorScreen';
import GrainWeightAfterDryingCalculatorScreen from '../screens/Calculators/GrainWeightAfterDryingCalculatorScreen';
import GrainStorageCalculatorScreen from '../screens/Calculators/GrainStorageCalculatorScreen';

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
                <Stack.Screen name="SeedingRateCalculator" component={SeedingRateCalculatorScreen} options={{ headerShown: true, title: 'Seeding Rate Calculator' }} />
                <Stack.Screen name="PlantDensityCalculator" component={PlantDensityCalculatorScreen} options={{ headerShown: true, title: 'Plant Density Calculator' }} />
                <Stack.Screen name="SowingDensityCalculator" component={SowingDensityCalculatorScreen} options={{ headerShown: true, title: 'Sowing Density Calculator' }} />
                <Stack.Screen name="CropProtectionCalculator" component={CropProtectionCalculatorScreen} options={{ headerShown: true, title: 'Crop Protection Calculator' }} />
                <Stack.Screen name="FertilizationCalculator" component={FertilizationCalculatorScreen} options={{ headerShown: true, title: 'Fertilization Calculator' }} />
                <Stack.Screen name="PlantWaterNeedsCalculator" component={PlantWaterNeedsCalculatorScreen} options={{ headerShown: true, title: 'Plant Water Needs Calculator' }} />
                <Stack.Screen name="GrainWeightAfterDryingCalculator" component={GrainWeightAfterDryingCalculatorScreen} options={{ headerShown: true, title: 'Grain Weight After Drying Calculator' }} />
                <Stack.Screen name="GrainStorageCalculator" component={GrainStorageCalculatorScreen} options={{ headerShown: true, title: 'Grain Storage Calculator' }} />
        </Stack.Navigator>
    );
};

export default CalculatorsStack;

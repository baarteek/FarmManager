import { createStackNavigator } from '@react-navigation/stack';
import CalculatorListScreen from '../screens/Calculators/CalculatorListScreen';
import SeedingRateCalculatorScreen from '../screens/Calculators/SeedingRateCalculatorScreen';
import PlantDensityCalculatorScreen from '../screens/Calculators/PlantDensityCalculatorScreen';
import SowingDensityCalculatorScreen from '../screens/Calculators/SowingDensityCalculatorScreen';

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
        </Stack.Navigator>
    );
};

export default CalculatorsStack;

import { ScrollView, StyleSheet, Text, View } from "react-native";
import InfoCard from "../../components/InfoCard";
import { styles } from '../../styles/AppStyles';
import { useNavigation } from '@react-navigation/native';

const CalculatorListScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{ backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#388E3C' }]}>Seeding and Planting</Text>
                    <InfoCard 
                        title="Seeding Rate Calculator"
                        description="Calculate the optimal seeding rate for your crops."
                        iconName="grain"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('SeedingRateCalculator')}
                    />
                    <InfoCard 
                        title="Plant Density Calculator"
                        description="Determine the optimal plant density for your fields."
                        iconName="nature"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('PlantDensityCalculator')}
                    />
                    <InfoCard 
                        title="Sowing Density Calculator"
                        description="Calculate the appropriate sowing density for your crops."
                        iconName="scatter-plot"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('SowingDensityCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#F57C00' }]}>Crop Protection and Fertilization</Text>
                    <InfoCard 
                        title="Crop Protection Calculator"
                        description="Calculate the required amount of crop protection chemicals."
                        iconName="shield"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('CropProtectionCalculator')}
                    />
                    <InfoCard 
                        title="Fertilization Calculator"
                        description="Determine the optimal amount of fertilizer for your crops."
                        iconName="spa"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('FertilizationCalculator')}
                    />
                    <InfoCard 
                        title="Plant Water Needs Calculator"
                        description="Calculate the water requirements for your plants."
                        iconName="opacity"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('PlantWaterNeedsCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#7B1FA2' }]}>Grain Management</Text>
                    <InfoCard 
                        title="Grain Weight After Drying Calculator"
                        description="Calculate the grain weight after drying."
                        iconName="straighten"
                        iconBackgroundColor="#9C27B0"
                        borderColor="#7B1FA2"
                        titleColor="#7B1FA2"
                        onPress={() => navigation.navigate('GrainWeightAfterDryingCalculator')}
                    />
                    <InfoCard 
                        title="Grain Storage Capacity Calculator"
                        description="Calculate how much grain (in tons) can be stored in a given storage capacity based on grain type and volume."
                        iconName="store"
                        iconBackgroundColor="#9C27B0"
                        borderColor="#7B1FA2"
                        titleColor="#7B1FA2"
                        onPress={() => navigation.navigate('GrainStorageCapacityCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#455A64' }]}>Machinery and Fuel</Text>
                    <InfoCard 
                        title="Fuel Consumption Calculator"
                        description="Calculate the fuel consumption of your agricultural machinery."
                        iconName="local-gas-station"
                        iconBackgroundColor="#607D8B"
                        borderColor="#455A64"
                        titleColor="#455A64"
                        onPress={() => navigation.navigate('FuelConsumptionCalculator')}
                    />
                    <InfoCard 
                        title="Machinery Efficiency Calculator"
                        description="Determine the efficiency of your agricultural machinery."
                        iconName="build"
                        iconBackgroundColor="#607D8B"
                        borderColor="#455A64"
                        titleColor="#455A64"
                        onPress={() => navigation.navigate('MachineryEfficiencyCalculator')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const calculatorStyles = StyleSheet.create({
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 24,
        padding: '1%',
        fontWeight: 'bold',
        marginVertical: '3%',
        textAlign: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center'
    }
});

export default CalculatorListScreen;

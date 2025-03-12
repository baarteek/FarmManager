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
                    <Text style={[calculatorStyles.categoryTitle, { color: '#388E3C' }]}>Siew i Sadzenie</Text>
                    <InfoCard 
                        title="Kalkulator Normy Wysiewu"
                        description="Oblicz optymalną normę wysiewu dla swoich upraw."
                        iconName="grain"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('SeedingRateCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Gęstości Roślin"
                        description="Określ optymalną gęstość roślin na polu."
                        iconName="nature"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('PlantDensityCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Gęstości Siewu"
                        description="Oblicz odpowiednią gęstość siewu dla swoich upraw."
                        iconName="scatter-plot"
                        iconBackgroundColor="#8BC34A"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => navigation.navigate('SowingDensityCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#F57C00' }]}>Ochrona Roślin i Nawożenie</Text>
                    <InfoCard 
                        title="Kalkulator Ochrony Roślin"
                        description="Oblicz wymaganą ilość środków ochrony roślin."
                        iconName="shield"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('CropProtectionCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Nawożenia"
                        description="Określ optymalną ilość nawozu dla swoich upraw."
                        iconName="spa"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('FertilizationCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Zapotrzebowania na Wodę"
                        description="Oblicz zapotrzebowanie roślin na wodę."
                        iconName="opacity"
                        iconBackgroundColor="#FF9800"
                        borderColor="#F57C00"
                        titleColor="#F57C00"
                        onPress={() => navigation.navigate('PlantWaterNeedsCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#7B1FA2' }]}>Zarządzanie Zbożem</Text>
                    <InfoCard 
                        title="Kalkulator Wagi Zboża po Suszeniu"
                        description="Oblicz wagę zboża po procesie suszenia."
                        iconName="straighten"
                        iconBackgroundColor="#9C27B0"
                        borderColor="#7B1FA2"
                        titleColor="#7B1FA2"
                        onPress={() => navigation.navigate('GrainWeightAfterDryingCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Pojemności Magazynowej"
                        description="Oblicz ile ton zboża można przechować w danym magazynie w zależności od rodzaju zboża i objętości."
                        iconName="store"
                        iconBackgroundColor="#9C27B0"
                        borderColor="#7B1FA2"
                        titleColor="#7B1FA2"
                        onPress={() => navigation.navigate('GrainStorageCapacityCalculator')}
                    />
                </View>

                <View style={calculatorStyles.separator} />

                <View style={calculatorStyles.categoryContainer}>
                    <Text style={[calculatorStyles.categoryTitle, { color: '#455A64' }]}>Maszyny i Paliwo</Text>
                    <InfoCard 
                        title="Kalkulator Zużycia Paliwa"
                        description="Oblicz zużycie paliwa przez swoje maszyny rolnicze."
                        iconName="local-gas-station"
                        iconBackgroundColor="#607D8B"
                        borderColor="#455A64"
                        titleColor="#455A64"
                        onPress={() => navigation.navigate('FuelConsumptionCalculator')}
                    />
                    <InfoCard 
                        title="Kalkulator Wydajności Maszyn"
                        description="Określ wydajność swoich maszyn rolniczych."
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
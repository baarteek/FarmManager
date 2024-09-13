import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View, Text, StyleSheet } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const CropProtectionCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [chemicalDose, setChemicalDose] = useState('');
    const [waterDose, setWaterDose] = useState('');
    const [sprayerCapacity, setSprayerCapacity] = useState('');
    const [totalChemical, setTotalChemical] = useState(null);
    const [totalWater, setTotalWater] = useState(null);
    const [numberOfFillings, setNumberOfFillings] = useState(null);
    const [areaPerFilling, setAreaPerFilling] = useState([]);

    const handleCalculate = () => {
        const areaSizeNum = formatDecimalInput(areaSize);
        const chemicalDoseNum = formatDecimalInput(chemicalDose);
        const waterDoseNum = formatDecimalInput(waterDose);
        const sprayerCapacityNum = formatDecimalInput(sprayerCapacity);

        if (
            isNaN(areaSizeNum) ||
            isNaN(chemicalDoseNum) ||
            isNaN(waterDoseNum) ||
            isNaN(sprayerCapacityNum) ||
            areaSizeNum <= 0 ||
            chemicalDoseNum <= 0 ||
            waterDoseNum <= 0 ||
            sprayerCapacityNum <= 0
        ) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        const totalChemicalAmount = areaSizeNum * chemicalDoseNum;
        const totalWaterAmount = areaSizeNum * waterDoseNum;
        const fillings = totalWaterAmount / sprayerCapacityNum;

        const maxAreaPerFilling = sprayerCapacityNum / waterDoseNum;
        let remainingArea = areaSizeNum;
        let calculatedAreas = [];
        let fillingIndex = 1;

        while (remainingArea > 0) {
            const areaThisFilling = Math.min(maxAreaPerFilling, remainingArea);
            const waterThisFilling = areaThisFilling * waterDoseNum;
            const chemicalThisFilling = areaThisFilling * chemicalDoseNum;

            calculatedAreas.push({
                filling: fillingIndex,
                water: parseFloat(waterThisFilling.toFixed(2)),
                chemical: parseFloat(chemicalThisFilling.toFixed(2)),
                area: parseFloat(areaThisFilling.toFixed(2)),
            });

            remainingArea -= areaThisFilling;
            fillingIndex++;
        }

        setTotalChemical(parseFloat(totalChemicalAmount.toFixed(2)));
        setTotalWater(parseFloat(totalWaterAmount.toFixed(2)));
        setNumberOfFillings(Math.ceil(fillings));
        setAreaPerFilling(calculatedAreas);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        resetResults();
    };

    const handleChemicalDoseChange = (value) => {
        setChemicalDose(value);
        resetResults();
    };

    const handleWaterDoseChange = (value) => {
        setWaterDose(value);
        resetResults();
    };

    const handleSprayerCapacityChange = (value) => {
        setSprayerCapacity(value);
        resetResults();
    };

    const resetResults = () => {
        setTotalChemical(null);
        setTotalWater(null);
        setNumberOfFillings(null);
        setAreaPerFilling([]);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Crop Protection Calculator"
                description="Calculate the required amount of crop protection chemicals, water, and the number of sprayer fillings based on field area and application rates."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Field Area (ha):" 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder="Enter field area in hectares" 
                />

                <InputField 
                    label="Chemical Dose (liters/ha):" 
                    value={chemicalDose} 
                    onChangeText={handleChemicalDoseChange} 
                    placeholder="Enter chemical dose in liters per hectare" 
                />

                <InputField 
                    label="Water Dose (liters/ha):" 
                    value={waterDose} 
                    onChangeText={handleWaterDoseChange} 
                    placeholder="Enter water dose in liters per hectare" 
                />

                <InputField 
                    label="Sprayer Capacity (liters):" 
                    value={sprayerCapacity} 
                    onChangeText={handleSprayerCapacityChange} 
                    placeholder="Enter sprayer capacity in liters" 
                />

                <CalculateButton onPress={handleCalculate} />

                {totalChemical !== null && (
                    <ResultDisplay 
                        result={totalChemical} 
                        label="Total Chemical Needed" 
                        icon="science" 
                        iconColor="#F57C00" 
                        unit='liters'
                    />
                )}

                {totalWater !== null && (
                    <ResultDisplay 
                        result={totalWater} 
                        label="Total Water Needed" 
                        icon="water" 
                        iconColor="#42A5F5" 
                        unit='liters'
                    />
                )}

                {numberOfFillings !== null && (
                    <ResultDisplay 
                        result={numberOfFillings} 
                        label="Number of Sprayer Fillings" 
                        icon="local-gas-station" 
                        iconColor="#7E57C2" 
                        unit='fillings'
                    />
                )}

                {areaPerFilling.length > 0 && (
                    <View style={{ marginTop: '5%', width: '100%' }}>
                        <Text style={[calculatorStyles.title, { textAlign: 'left', marginBottom: 10 }]}>Filling Details:</Text>
                        {areaPerFilling.map((item, index) => (
                            <View key={index} style={styles.fillingCard}>
                                <Text style={styles.fillingTitle}>Filling {item.filling}</Text>
                                <View style={styles.fillingDetailRow}>
                                    <Text style={styles.fillingDetailLabel}>Area Covered:</Text>
                                    <Text style={styles.fillingDetailValue}>{item.area} ha</Text>
                                </View>
                                <View style={styles.fillingDetailRow}>
                                    <Text style={styles.fillingDetailLabel}>Water Needed:</Text>
                                    <Text style={styles.fillingDetailValue}>{item.water} liters</Text>
                                </View>
                                <View style={styles.fillingDetailRow}>
                                    <Text style={styles.fillingDetailLabel}>Chemical Needed:</Text>
                                    <Text style={styles.fillingDetailValue}>{item.chemical} liters</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </CalculatorLayout>
    );
};

const styles = StyleSheet.create({
    fillingCard: {
        backgroundColor: '#f0f4f8',
        padding: '5%',
        borderRadius: 8,
        marginBottom: '3%',
        elevation: 2,
    },
    fillingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '3%',
        color: '#333',
    },
    fillingDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1%',
    },
    fillingDetailLabel: {
        fontSize: 16,
        color: '#555',
    },
    fillingDetailValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default CropProtectionCalculatorScreen;

import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';
const SeedingRateCalculatorScreen = () => {
    const [thousandGrainWeight, setThousandGrainWeight] = useState(''); 
    const [plantDensity, setPlantDensity] = useState(''); 
    const [germinationPower, setGerminationPower] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const tgwNum = formatDecimalInput(thousandGrainWeight);
        const densityNum = formatDecimalInput(plantDensity);
        const germinationNum = formatDecimalInput(germinationPower);

        if (isNaN(tgwNum) || isNaN(densityNum) || isNaN(germinationNum) || germinationNum <= 0) {
            alert('Please enter valid numbers for TGW, plant density, and germination power (greater than 0).');
            return;
        }

        const seedingRate = (tgwNum * densityNum) / germinationNum;
        const seedingResult = parseFloat(seedingRate.toFixed(2));
        setResult(seedingResult);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Seeding Rate Calculator"
                description="Calculate the optimal seeding rate (kg/ha) based on Thousand Grain Weight (TGW), plant density, and germination power."
            />
            
            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Thousand Grain Weight (TGW) (g):" 
                    value={thousandGrainWeight} 
                    onChangeText={(value) => setThousandGrainWeight(value)}
                    placeholder="Enter TGW in grams" 
                />

                <InputField 
                    label="Plant Density (plants/m2):" 
                    value={plantDensity} 
                    onChangeText={(value) => setPlantDensity(value)}
                    placeholder="Enter plant density per m2" 
                />

                <InputField 
                    label="Germination Power (%):" 
                    value={germinationPower} 
                    onChangeText={(value) => setGerminationPower(value)}
                    placeholder="Enter germination power as percentage" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay result={result} label="Required Seed Rate (kg/ha)" icon="eco" iconColor="#1f78b4" unit='kg/ha'/>
            </View>
        </CalculatorLayout>
    );
};

export default SeedingRateCalculatorScreen;

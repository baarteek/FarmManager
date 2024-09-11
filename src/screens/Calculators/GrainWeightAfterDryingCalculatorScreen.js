import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const GrainWeightAfterDryingCalculatorScreen = () => {
    const [initialWeight, setInitialWeight] = useState('');
    const [initialMoisture, setInitialMoisture] = useState('');
    const [finalMoisture, setFinalMoisture] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const initialWeightNum = parseFloat(initialWeight);
        const initialMoistureNum = parseFloat(initialMoisture);
        const finalMoistureNum = parseFloat(finalMoisture);

        if (
            isNaN(initialWeightNum) ||
            isNaN(initialMoistureNum) ||
            isNaN(finalMoistureNum) ||
            initialWeightNum <= 0 ||
            initialMoistureNum <= 0 ||
            finalMoistureNum < 0 ||
            initialMoistureNum <= finalMoistureNum
        ) {
            alert('Please enter valid numbers. Initial weight must be positive, and initial moisture must be greater than final moisture.');
            return;
        }

        const driedWeight = initialWeightNum * (100 - initialMoistureNum) / (100 - finalMoistureNum);

        if (driedWeight % 1 === 0) {
            setResult(Math.round(driedWeight));
        } else {
            setResult(parseFloat(driedWeight.toFixed(2)));
        }
    };

    const handleInitialWeightChange = (value) => {
        setInitialWeight(value);
        setResult(null);
    };

    const handleInitialMoistureChange = (value) => {
        setInitialMoisture(value);
        setResult(null);
    };

    const handleFinalMoistureChange = (value) => {
        setFinalMoisture(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Grain Weight After Drying Calculator"
                description="Calculate the grain weight after drying based on initial weight and moisture content before and after drying."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Initial Weight (kg):" 
                    value={initialWeight} 
                    onChangeText={handleInitialWeightChange} 
                    placeholder="Enter the initial weight in kilograms" 
                />

                <InputField 
                    label="Initial Moisture Content (%):" 
                    value={initialMoisture} 
                    onChangeText={handleInitialMoistureChange} 
                    placeholder="Enter the initial moisture content in percentage" 
                />

                <InputField 
                    label="Final Moisture Content (%):" 
                    value={finalMoisture} 
                    onChangeText={handleFinalMoistureChange} 
                    placeholder="Enter the final moisture content in percentage" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Weight After Drying" 
                    icon="straighten" 
                    iconColor="#7B1FA2" 
                    unit='kg'
                />
            </View>
        </CalculatorLayout>
    );
};

export default GrainWeightAfterDryingCalculatorScreen;

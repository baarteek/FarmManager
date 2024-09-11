import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const GrainStorageCalculatorScreen = () => {
    const [grainWeight, setGrainWeight] = useState('');
    const [grainMoisture, setGrainMoisture] = useState('');
    const [storageCapacity, setStorageCapacity] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const grainWeightNum = parseFloat(grainWeight);
        const grainMoistureNum = parseFloat(grainMoisture);
        const storageCapacityNum = parseFloat(storageCapacity);

        if (
            isNaN(grainWeightNum) ||
            isNaN(grainMoistureNum) ||
            isNaN(storageCapacityNum) ||
            grainWeightNum <= 0 ||
            grainMoistureNum <= 0 ||
            grainMoistureNum > 100 ||
            storageCapacityNum <= 0
        ) {
            alert('Please enter valid numbers. Grain weight and storage capacity must be positive, and moisture content must be between 0 and 100.');
            return;
        }

        const optimalStorageDays = (100 - grainMoistureNum) * storageCapacityNum / grainWeightNum;

        if (optimalStorageDays % 1 === 0) {
            setResult(Math.round(optimalStorageDays));
        } else {
            setResult(parseFloat(optimalStorageDays.toFixed(2)));
        }
    };

    const handleGrainWeightChange = (value) => {
        setGrainWeight(value);
        setResult(null);
    };

    const handleGrainMoistureChange = (value) => {
        setGrainMoisture(value);
        setResult(null);
    };

    const handleStorageCapacityChange = (value) => {
        setStorageCapacity(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Grain Storage Calculator"
                description="Calculate optimal storage conditions for your grain based on grain weight, moisture content, and storage capacity."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Grain Weight (kg):" 
                    value={grainWeight} 
                    onChangeText={handleGrainWeightChange} 
                    placeholder="Enter the grain weight in kilograms" 
                />

                <InputField 
                    label="Grain Moisture Content (%):" 
                    value={grainMoisture} 
                    onChangeText={handleGrainMoistureChange} 
                    placeholder="Enter the grain moisture content in percentage" 
                />

                <InputField 
                    label="Storage Capacity (m³):" 
                    value={storageCapacity} 
                    onChangeText={handleStorageCapacityChange} 
                    placeholder="Enter the storage capacity in cubic meters" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Optimal Storage Duration" 
                    icon="store" 
                    iconColor="#7B1FA2" 
                    unit='days'
                />
            </View>
        </CalculatorLayout>
    );
};

export default GrainStorageCalculatorScreen;

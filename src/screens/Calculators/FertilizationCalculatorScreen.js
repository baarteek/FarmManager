import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const FertilizationCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [fertilizerRate, setFertilizerRate] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('kilograms per hectare');

    const handleCalculate = () => {
        const areaSizeNum = parseFloat(areaSize);
        const fertilizerRateNum = parseFloat(fertilizerRate);

        if (isNaN(areaSizeNum) || isNaN(fertilizerRateNum) || fertilizerRateNum <= 0) {
            alert('Please enter valid numbers for field area and fertilizer rate.');
            return;
        }

        const multiplier = unit === 'kilograms per hectare' ? 1 : 0.1;
        const fertilizerAmount = areaSizeNum * fertilizerRateNum * multiplier;

        if (fertilizerAmount % 1 === 0) {
            setResult(Math.round(fertilizerAmount));
        } else {
            setResult(parseFloat(fertilizerAmount.toFixed(2)));
        }
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setAreaSize('');
        setFertilizerRate('');
        setResult(null);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        setResult(null);
    };

    const handleFertilizerRateChange = (value) => {
        setFertilizerRate(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Fertilization Calculator"
                description="Determine the optimal amount of fertilizer for your crops based on field area and fertilizer rate."
            />

            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                    units={[
                        { label: 'Kg per Hectare', value: 'kilograms per hectare' },
                        { label: 'Kg per Are', value: 'kilograms per are' }
                    ]}
                    selectedUnit={unit}
                    onUnitChange={handleUnitChange}
                />

                <InputField 
                    label={`Field Area (${unit === 'kilograms per hectare' ? 'hectares' : 'ares'}):`} 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder={`Enter field area in ${unit === 'kilograms per hectare' ? 'hectares' : 'ares'}`} 
                />

                <InputField 
                    label="Fertilizer Rate (kg per unit area):" 
                    value={fertilizerRate} 
                    onChangeText={handleFertilizerRateChange} 
                    placeholder={`Enter fertilizer rate in kg per ${unit === 'kilograms per hectare' ? 'hectare' : 'are'}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Required Fertilizer Amount" 
                    icon="spa" 
                    iconColor="#F57C00" 
                    unit='kilograms'
                />
            </View>
        </CalculatorLayout>
    );
};

export default FertilizationCalculatorScreen;

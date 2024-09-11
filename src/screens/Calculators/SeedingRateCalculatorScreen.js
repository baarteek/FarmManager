import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const SeedingRateCalculatorScreen = () => {
    const [fieldSize, setFieldSize] = useState('');
    const [seedRate, setSeedRate] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('ares');

    const handleCalculate = () => {
        const fieldSizeNum = parseFloat(fieldSize);
        const seedRateNum = parseFloat(seedRate);

        if (isNaN(fieldSizeNum) || isNaN(seedRateNum)) {
            alert('Please enter valid numbers for field size and seed rate.');
            return;
        }

        const multiplier = unit === 'hectares' ? 100 : 1;
        let seedingResult = fieldSizeNum * seedRateNum * multiplier;

        if (seedingResult % 1 === 0) {
            seedingResult = Math.round(seedingResult);
        } else {
            seedingResult = parseFloat(seedingResult.toFixed(2));
        }

        setResult(seedingResult);
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setFieldSize('');
        setSeedRate('');
        setResult(null);
    };

    const handleFieldSizeChange = (value) => {
        setFieldSize(value);
        setResult(null);
    };

    const handleSeedRateChange = (value) => {
        setSeedRate(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Seeding Rate Calculator"
                description="Calculate the optimal amount of seeds needed for your field based on its size and seed rate."
            />
            
            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                    units={[
                        { label: 'Ares', value: 'ares' },
                        { label: 'Hectares', value: 'hectares' }
                    ]}
                    selectedUnit={unit}
                    onUnitChange={handleUnitChange}
                />

                <InputField 
                    label={`Field Size (${unit === 'ares' ? 'ares' : 'hectares'}):`} 
                    value={fieldSize} 
                    onChangeText={handleFieldSizeChange} 
                    placeholder={`Enter field size in ${unit}`} 
                />

                <InputField 
                    label={`Seed Rate (kg per ${unit}):`} 
                    value={seedRate} 
                    onChangeText={handleSeedRateChange} 
                    placeholder={`Enter seed rate in kg per ${unit}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay result={result} label="Required Seed" icon="eco" iconColor="#1f78b4" unit='kg'/>
            </View>
        </CalculatorLayout>
    );
};

export default SeedingRateCalculatorScreen;

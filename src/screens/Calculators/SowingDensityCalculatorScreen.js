import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const SowingDensityCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [seedsPerArea, setSeedsPerArea] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('ares'); 

    const handleCalculate = () => {
        const areaSizeNum = formatDecimalInput(areaSize);
        const seedsPerAreaNum = formatDecimalInput(seedsPerArea);

        if (isNaN(areaSizeNum) || isNaN(seedsPerAreaNum) || seedsPerAreaNum <= 0) {
            alert('Please enter valid numbers for area size and seeds per area.');
            return;
        }

        const multiplier = unit === 'hectares' ? 100 : 1;  

        const totalSeeds = areaSizeNum * multiplier * seedsPerAreaNum;

        setResult(parseFloat(totalSeeds.toFixed(2)));  
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setAreaSize('');
        setSeedsPerArea('');
        setResult(null);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        setResult(null);
    };

    const handleSeedsPerAreaChange = (value) => {
        setSeedsPerArea(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Sowing Density Calculator"
                description="Calculate the appropriate sowing density for your crops based on area size and number of seeds per area unit."
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
                    label={`Area Size (${unit === 'ares' ? 'ares' : 'hectares'}):`} 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder={`Enter area size in ${unit}`} 
                />

                <InputField 
                    label={`Seeds per Area Unit (e.g., seeds per ${unit === 'ares' ? 'ares' : 'hectare'}):`} 
                    value={seedsPerArea} 
                    onChangeText={handleSeedsPerAreaChange} 
                    placeholder={`Enter seeds per ${unit === 'ares' ? 'ares' : 'hectare'}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Total Seeds Required" 
                    icon="scatter-plot" 
                    iconColor="#388E3C" 
                    unit='seeds'
                />
            </View>
        </CalculatorLayout>
    );
};

export default SowingDensityCalculatorScreen;

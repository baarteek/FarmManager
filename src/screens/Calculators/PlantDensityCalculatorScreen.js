import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const PlantDensityCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [plantSpacing, setPlantSpacing] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('square meters');

    const handleCalculate = () => {
        const areaSizeNum = parseFloat(areaSize);
        const plantSpacingNum = parseFloat(plantSpacing);

        if (isNaN(areaSizeNum) || isNaN(plantSpacingNum) || plantSpacingNum <= 0) {
            alert('Please enter valid numbers for area size and plant spacing.');
            return;
        }

        const multiplier = unit === 'hectares' ? 10000 : 1;
        const plantDensityResult = (areaSizeNum * multiplier) / (plantSpacingNum * plantSpacingNum);

        if (plantDensityResult % 1 === 0) {
            setResult(Math.round(plantDensityResult));
        } else {
            setResult(parseFloat(plantDensityResult.toFixed(2)));
        }
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setAreaSize('');
        setPlantSpacing('');
        setResult(null);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        setResult(null);
    };

    const handlePlantSpacingChange = (value) => {
        setPlantSpacing(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Plant Density Calculator"
                description="Determine the optimal plant density for your fields based on area size and spacing between plants."
            />

            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                    units={[
                        { label: 'Square Meters', value: 'square meters' },
                        { label: 'Hectares', value: 'hectares' }
                    ]}
                    selectedUnit={unit}
                    onUnitChange={handleUnitChange}
                />

                <InputField 
                    label={`Area Size (${unit === 'square meters' ? 'm²' : 'hectares'}):`} 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder={`Enter area size in ${unit}`} 
                />

                <InputField 
                    label="Plant Spacing (meters):" 
                    value={plantSpacing} 
                    onChangeText={handlePlantSpacingChange} 
                    placeholder="Enter spacing between plants in meters" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Plant Density" 
                    icon="nature" 
                    iconColor="#388E3C" 
                    unit='plants per area unit'
                />
            </View>
        </CalculatorLayout>
    );
};

export default PlantDensityCalculatorScreen;

import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const CropProtectionCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [solutionConcentration, setSolutionConcentration] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('liters per hectare');

    const handleCalculate = () => {
        const areaSizeNum = parseFloat(areaSize);
        const solutionConcentrationNum = parseFloat(solutionConcentration);

        if (isNaN(areaSizeNum) || isNaN(solutionConcentrationNum) || solutionConcentrationNum <= 0) {
            alert('Please enter valid numbers for area size and solution concentration.');
            return;
        }

        const multiplier = unit === 'liters per hectare' ? 1 : 0.1;
        const chemicalAmount = areaSizeNum * solutionConcentrationNum * multiplier;

        if (chemicalAmount % 1 === 0) {
            setResult(Math.round(chemicalAmount));
        } else {
            setResult(parseFloat(chemicalAmount.toFixed(2)));
        }
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setAreaSize('');
        setSolutionConcentration('');
        setResult(null);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        setResult(null);
    };

    const handleSolutionConcentrationChange = (value) => {
        setSolutionConcentration(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Crop Protection Calculator"
                description="Calculate the required amount of crop protection chemicals based on field area and solution concentration."
            />

            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                    units={[
                        { label: 'Liters per Hectare', value: 'liters per hectare' },
                        { label: 'Liters per Are', value: 'liters per are' }
                    ]}
                    selectedUnit={unit}
                    onUnitChange={handleUnitChange}
                />

                <InputField 
                    label={`Field Area (${unit === 'liters per hectare' ? 'hectares' : 'ares'}):`} 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder={`Enter field area in ${unit === 'liters per hectare' ? 'hectares' : 'ares'}`} 
                />

                <InputField 
                    label="Solution Concentration (liters):" 
                    value={solutionConcentration} 
                    onChangeText={handleSolutionConcentrationChange} 
                    placeholder="Enter solution concentration in liters per unit area" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Required Chemical Amount" 
                    icon="shield" 
                    iconColor="#F57C00" 
                    unit='liters'
                />
            </View>
        </CalculatorLayout>
    );
};

export default CropProtectionCalculatorScreen;

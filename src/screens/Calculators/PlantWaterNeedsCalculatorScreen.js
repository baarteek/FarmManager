import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import UnitSelector from '../../components/UnitSelector';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const PlantWaterNeedsCalculatorScreen = () => {
    const [areaSize, setAreaSize] = useState('');
    const [waterRate, setWaterRate] = useState('');
    const [result, setResult] = useState(null);
    const [unit, setUnit] = useState('liters per square meter');

    const handleCalculate = () => {
        const areaSizeNum = parseFloat(areaSize);
        const waterRateNum = parseFloat(waterRate);

        if (isNaN(areaSizeNum) || isNaN(waterRateNum) || waterRateNum <= 0) {
            alert('Please enter valid numbers for field area and water rate.');
            return;
        }

        const multiplier = unit === 'liters per hectare' ? 10000 : 1;
        const waterAmount = areaSizeNum * waterRateNum * multiplier;

        if (waterAmount % 1 === 0) {
            setResult(Math.round(waterAmount));
        } else {
            setResult(parseFloat(waterAmount.toFixed(2)));
        }
    };

    const handleUnitChange = (selectedUnit) => {
        setUnit(selectedUnit);
        setAreaSize('');
        setWaterRate('');
        setResult(null);
    };

    const handleAreaSizeChange = (value) => {
        setAreaSize(value);
        setResult(null);
    };

    const handleWaterRateChange = (value) => {
        setWaterRate(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Plant Water Needs Calculator"
                description="Calculate the water requirements for your plants based on field area and water rate."
            />

            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                    units={[
                        { label: 'Liters per m²', value: 'liters per square meter' },
                        { label: 'Liters per Hectare', value: 'liters per hectare' }
                    ]}
                    selectedUnit={unit}
                    onUnitChange={handleUnitChange}
                />

                <InputField 
                    label={`Field Area (${unit === 'liters per square meter' ? 'square meters' : 'hectares'}):`} 
                    value={areaSize} 
                    onChangeText={handleAreaSizeChange} 
                    placeholder={`Enter field area in ${unit === 'liters per square meter' ? 'square meters' : 'hectares'}`} 
                />

                <InputField 
                    label="Water Rate (liters per unit area):" 
                    value={waterRate} 
                    onChangeText={handleWaterRateChange} 
                    placeholder={`Enter water rate in liters per ${unit === 'liters per square meter' ? 'square meter' : 'hectare'}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Required Water Amount" 
                    icon="opacity" 
                    iconColor="#F57C00" 
                    unit='liters'
                />
            </View>
        </CalculatorLayout>
    );
};

export default PlantWaterNeedsCalculatorScreen;

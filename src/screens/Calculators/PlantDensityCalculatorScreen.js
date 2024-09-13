import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const PlantDensityCalculatorScreen = () => {
    const [plantCount, setPlantCount] = useState('');
    const [rowLength, setRowLength] = useState('');
    const [rowSpacing, setRowSpacing] = useState(''); 
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const plantCountNum = formatDecimalInput(plantCount);
        const rowLengthNum = formatDecimalInput(rowLength);
        const rowSpacingNum = formatDecimalInput(rowSpacing);

        if (isNaN(plantCountNum) || isNaN(rowLengthNum) || isNaN(rowSpacingNum) || rowLengthNum <= 0 || rowSpacingNum <= 0) {
            alert('Please enter valid numbers for plant count, row length, and row spacing.');
            return;
        }

        const rowLengthMeters = rowLengthNum / 100;
        const plantDensityResult = (plantCountNum / rowLengthMeters) * (100 / rowSpacingNum);

        setResult(parseFloat(plantDensityResult.toFixed(2)));
    };

    const handlePlantCountChange = (value) => {
        setPlantCount(value);
        setResult(null);
    };

    const handleRowLengthChange = (value) => {
        setRowLength(value);
        setResult(null);
    };

    const handleRowSpacingChange = (value) => {
        setRowSpacing(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Plant Density Calculator"
                description="Determine the plant density (plants per m²) for your field based on plant count, row length, and row spacing."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Number of Plants in Measured Row:" 
                    value={plantCount} 
                    onChangeText={handlePlantCountChange} 
                    placeholder="Enter number of plants in the measured row" 
                />

                <InputField 
                    label="Length of Measured Row (cm):" 
                    value={rowLength} 
                    onChangeText={handleRowLengthChange} 
                    placeholder="Enter length of the row in cm" 
                />

                <InputField 
                    label="Row Spacing (cm):" 
                    value={rowSpacing} 
                    onChangeText={handleRowSpacingChange} 
                    placeholder="Enter spacing between rows in cm" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Plant Density" 
                    icon="nature" 
                    iconColor="#388E3C" 
                    unit='plants/m²'
                />
            </View>
        </CalculatorLayout>
    );
};

export default PlantDensityCalculatorScreen;

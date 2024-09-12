import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const CropCostCalculatorScreen = () => {
    const [seedCost, setSeedCost] = useState('');
    const [fertilizerCost, setFertilizerCost] = useState('');
    const [laborCost, setLaborCost] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const seedCostNum = parseFloat(seedCost);
        const fertilizerCostNum = parseFloat(fertilizerCost);
        const laborCostNum = parseFloat(laborCost);

        if (
            isNaN(seedCostNum) ||
            isNaN(fertilizerCostNum) ||
            isNaN(laborCostNum) ||
            seedCostNum < 0 ||
            fertilizerCostNum < 0 ||
            laborCostNum < 0
        ) {
            alert('Please enter valid numbers. All costs must be positive.');
            return;
        }

        const totalCost = seedCostNum + fertilizerCostNum + laborCostNum;
        setResult(totalCost.toFixed(2));
    };

    const handleSeedCostChange = (value) => {
        setSeedCost(value);
        setResult(null);
    };

    const handleFertilizerCostChange = (value) => {
        setFertilizerCost(value);
        setResult(null);
    };

    const handleLaborCostChange = (value) => {
        setLaborCost(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Crop Cost Calculator"
                description="Analyze the costs associated with different crops, including seeds, fertilizers, and labor."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Seed Cost ($):" 
                    value={seedCost} 
                    onChangeText={handleSeedCostChange} 
                    placeholder="Enter the cost of seeds in dollars" 
                />

                <InputField 
                    label="Fertilizer Cost ($):" 
                    value={fertilizerCost} 
                    onChangeText={handleFertilizerCostChange} 
                    placeholder="Enter the cost of fertilizers in dollars" 
                />

                <InputField 
                    label="Labor Cost ($):" 
                    value={laborCost} 
                    onChangeText={handleLaborCostChange} 
                    placeholder="Enter the cost of labor in dollars" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Total Crop Cost" 
                    icon="attach-money" 
                    iconColor="#00ACC1" 
                    unit='$'
                />
            </View>
        </CalculatorLayout>
    );
};

export default CropCostCalculatorScreen;

import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';

const SoilQualityCalculatorScreen = () => {
    const [phLevel, setPhLevel] = useState('');
    const [organicMatter, setOrganicMatter] = useState('');
    const [soilTexture, setSoilTexture] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const phLevelNum = parseFloat(phLevel);
        const organicMatterNum = parseFloat(organicMatter);
        const soilTextureNum = parseFloat(soilTexture);

        if (
            isNaN(phLevelNum) ||
            isNaN(organicMatterNum) ||
            isNaN(soilTextureNum) ||
            phLevelNum < 0 || phLevelNum > 14 ||
            organicMatterNum <= 0 ||
            soilTextureNum <= 0
        ) {
            alert('Please enter valid numbers. pH level must be between 0 and 14, organic matter and soil texture values must be positive.');
            return;
        }

        const soilQualityScore = (14 - phLevelNum) + organicMatterNum * 0.5 + soilTextureNum;

        setResult(soilQualityScore.toFixed(2));
    };

    const handlePhLevelChange = (value) => {
        setPhLevel(value);
        setResult(null);
    };

    const handleOrganicMatterChange = (value) => {
        setOrganicMatter(value);
        setResult(null);
    };

    const handleSoilTextureChange = (value) => {
        setSoilTexture(value);
        setResult(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Soil Quality Assessment Calculator"
                description="Assess the quality of your soil based on pH level, organic matter content, and soil texture."
            />

            <View style={calculatorStyles.contentContainer}>
                <InputField 
                    label="Soil pH Level:" 
                    value={phLevel} 
                    onChangeText={handlePhLevelChange} 
                    placeholder="Enter the soil pH level (0-14)" 
                />

                <InputField 
                    label="Organic Matter Content (%):" 
                    value={organicMatter} 
                    onChangeText={handleOrganicMatterChange} 
                    placeholder="Enter the organic matter content in percentage" 
                />

                <InputField 
                    label="Soil Texture Rating:" 
                    value={soilTexture} 
                    onChangeText={handleSoilTextureChange} 
                    placeholder="Enter the soil texture rating (1-10)" 
                />

                <CalculateButton onPress={handleCalculate} />

                <ResultDisplay 
                    result={result} 
                    label="Soil Quality Score" 
                    icon="assessment" 
                    iconColor="#00ACC1" 
                    unit='points'
                />
            </View>
        </CalculatorLayout>
    );
};

export default SoilQualityCalculatorScreen;

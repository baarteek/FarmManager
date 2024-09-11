import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { calculatorStyles } from '../styles/CalculatorStyles';

const CalculateButton = ({ onPress, label = "Calculate" }) => (
    <TouchableOpacity style={calculatorStyles.button} onPress={onPress}>
        <Text style={calculatorStyles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

export default CalculateButton;
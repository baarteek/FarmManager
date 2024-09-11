import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { calculatorStyles } from '../styles/CalculatorStyles';

const ResultDisplay = ({ result, label = "Result", icon = "grain", iconColor = "#1f78b4", unit="" }) => (
    result !== null && (
        <View style={calculatorStyles.resultContainer}>
            <Icon name={icon} size={24} color={iconColor} />
            <Text style={calculatorStyles.resultText}>{label}: {result} {unit}</Text>
        </View>
    )
);

export default ResultDisplay;

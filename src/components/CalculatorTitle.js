import React from 'react';
import { View, Text } from 'react-native';
import { calculatorStyles } from '../styles/CalculatorStyles';

const CalculatorTitle = ({ title, description }) => (
    <View style={{ alignItems: 'center', marginBottom: '5%', marginTop: '10%' }}>
        {title && <Text style={calculatorStyles.title}>{title}</Text>}
        {description && <Text style={calculatorStyles.description}>{description}</Text>}
    </View>
);

export default CalculatorTitle;

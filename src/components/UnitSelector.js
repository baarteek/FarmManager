import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { calculatorStyles } from '../styles/CalculatorStyles';

const UnitSelector = ({ units, selectedUnit, onUnitChange }) => (
    <View>
        <Text style={calculatorStyles.infoText}>
            Please choose a unit:
        </Text>
        <View style={calculatorStyles.unitSelector}>
            {units.map(unit => (
                <TouchableOpacity 
                    key={unit.value}
                    style={[calculatorStyles.unitButton, selectedUnit === unit.value && { backgroundColor: '#1f78b4' }]} 
                    onPress={() => onUnitChange(unit.value)}
                >
                    <Text style={[calculatorStyles.unitButtonText, selectedUnit === unit.value && { color: '#fff' }]}>
                        {unit.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

export default UnitSelector;

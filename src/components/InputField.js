import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { calculatorStyles } from '../styles/CalculatorStyles';

const InputField = ({ label, value, onChangeText, placeholder }) => (
    <View style={calculatorStyles.inputContainer}>
        {label && <Text style={calculatorStyles.infoText}>{label}</Text>}
        <TextInput
            style={calculatorStyles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
        />
    </View>
);

export default InputField;
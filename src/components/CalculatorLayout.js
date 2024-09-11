import React from 'react';
import { ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { calculatorStyles } from '../styles/CalculatorStyles';

const CalculatorLayout = ({ children }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={calculatorStyles.container}>
            {children}
        </ScrollView>
    </TouchableWithoutFeedback>
);

export default CalculatorLayout;

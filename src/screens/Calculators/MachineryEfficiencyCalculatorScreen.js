import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import UnitSelector from '../../components/UnitSelector';
import { View } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const MachineryEfficiencyCalculatorScreen = () => {
    const [fuelConsumed, setFuelConsumed] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [measurementUnit, setMeasurementUnit] = useState('hectares');
    const [areaOrDistance, setAreaOrDistance] = useState('');
    const [workEfficiency, setWorkEfficiency] = useState(null);
    const [fuelConsumptionRate, setFuelConsumptionRate] = useState(null);

    const handleCalculate = () => {
        const fuelConsumedNum = formatDecimalInput(fuelConsumed);
        const workingHoursNum = formatDecimalInput(workingHours);
        const areaOrDistanceNum = formatDecimalInput(areaOrDistance);

        if (
            isNaN(fuelConsumedNum) ||
            isNaN(workingHoursNum) ||
            isNaN(areaOrDistanceNum) ||
            fuelConsumedNum <= 0 ||
            workingHoursNum <= 0 ||
            areaOrDistanceNum <= 0
        ) {
            alert('Please enter valid numbers for fuel consumed, working hours, and area or distance covered.');
            return;
        }

        const workEfficiency = areaOrDistanceNum / workingHoursNum; // Work efficiency (ha/hour or km/hour)
        const fuelConsumptionRate = fuelConsumedNum / areaOrDistanceNum; // Fuel consumption (liters/ha or liters/km)

        setWorkEfficiency(workEfficiency.toFixed(2));
        setFuelConsumptionRate(fuelConsumptionRate.toFixed(2));
    };

    const handleFuelConsumedChange = (value) => {
        setFuelConsumed(value);
        resetResults();
    };

    const handleWorkingHoursChange = (value) => {
        setWorkingHours(value);
        resetResults();
    };

    const handleAreaOrDistanceChange = (value) => {
        setAreaOrDistance(value);
        resetResults();
    };

    const handleMeasurementUnitChange = (value) => {
        setMeasurementUnit(value);
        setAreaOrDistance('');
        resetResults();
    };

    const resetResults = () => {
        setWorkEfficiency(null);
        setFuelConsumptionRate(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Machinery Efficiency Calculator"
                description="Determine the efficiency of your agricultural machinery based on fuel consumption, working hours, and area covered or distance traveled."
            />

            <View style={calculatorStyles.contentContainer}>
                <UnitSelector 
                        units={[
                            { label: 'Hectares (ha)', value: 'hectares' },
                            { label: 'Kilometers (km)', value: 'kilometers' }
                        ]}
                        selectedUnit={measurementUnit}
                        onUnitChange={handleMeasurementUnitChange}
                />

                <InputField 
                    label="Fuel Consumed (liters):" 
                    value={fuelConsumed} 
                    onChangeText={handleFuelConsumedChange} 
                    placeholder="Enter the amount of fuel consumed in liters" 
                />

                <InputField 
                    label="Working Hours:" 
                    value={workingHours} 
                    onChangeText={handleWorkingHoursChange} 
                    placeholder="Enter the number of working hours" 
                />

                <InputField 
                    label={`Enter ${measurementUnit === 'hectares' ? 'Area Covered (ha)' : 'Distance Traveled (km)'}:`} 
                    value={areaOrDistance} 
                    onChangeText={handleAreaOrDistanceChange} 
                    placeholder={`Enter ${measurementUnit === 'hectares' ? 'area in hectares' : 'distance in kilometers'}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                {workEfficiency !== null && (
                    <ResultDisplay 
                        result={workEfficiency} 
                        label={`Work Efficiency (${measurementUnit === 'hectares' ? 'ha/hour' : 'km/hour'})`} 
                        icon="access-time" 
                        iconColor="#607D8B" 
                        unit={`${measurementUnit === 'hectares' ? 'ha/hour' : 'km/hour'}`}
                    />
                )}

                {fuelConsumptionRate !== null && (
                    <ResultDisplay 
                        result={fuelConsumptionRate} 
                        label={`Fuel Consumption (${measurementUnit === 'hectares' ? 'liters/ha' : 'liters/km'})`} 
                        icon="local-gas-station" 
                        iconColor="#607D8B" 
                        unit={`liters/${measurementUnit === 'hectares' ? 'ha' : 'km'}`}
                    />
                )}
            </View>
        </CalculatorLayout>
    );
};

export default MachineryEfficiencyCalculatorScreen;

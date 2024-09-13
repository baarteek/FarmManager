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

const FuelConsumptionCalculatorScreen = () => {
    const [fuelConsumed, setFuelConsumed] = useState('');
    const [measurementUnit, setMeasurementUnit] = useState('hectares');
    const [areaOrDistance, setAreaOrDistance] = useState('');
    const [consumptionPerUnit, setConsumptionPerUnit] = useState(null);
    const [consumptionPerKm, setConsumptionPerKm] = useState(null);
    const [consumptionPer100Km, setConsumptionPer100Km] = useState(null);

    const handleCalculate = () => {
        const fuelConsumedNum = formatDecimalInput(fuelConsumed);
        const areaOrDistanceNum = formatDecimalInput(areaOrDistance);

        if (
            isNaN(fuelConsumedNum) ||
            isNaN(areaOrDistanceNum) ||
            fuelConsumedNum <= 0 ||
            areaOrDistanceNum <= 0
        ) {
            alert('Please enter valid numbers for fuel consumed and area or distance covered.');
            return;
        }

        const consumptionPerUnit = fuelConsumedNum / areaOrDistanceNum;
        setConsumptionPerUnit(consumptionPerUnit.toFixed(2));

        if (measurementUnit === 'kilometers') {
            setConsumptionPerKm(consumptionPerUnit.toFixed(2));
            setConsumptionPer100Km((consumptionPerUnit * 100).toFixed(2));
        } else {
            setConsumptionPerKm(null);
            setConsumptionPer100Km(null);
        }
    };

    const handleFuelConsumedChange = (value) => {
        setFuelConsumed(value);
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
        setConsumptionPerUnit(null);
        setConsumptionPerKm(null);
        setConsumptionPer100Km(null);
    };

    return (
        <CalculatorLayout>
            <CalculatorTitle 
                title="Fuel Consumption Calculator"
                description="Calculate the fuel consumption of your agricultural machinery based on the fuel consumed and either the area covered or the distance traveled."
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
                    label={`Enter ${measurementUnit === 'hectares' ? 'Area Covered (ha)' : 'Distance Traveled (km)'}:`} 
                    value={areaOrDistance} 
                    onChangeText={handleAreaOrDistanceChange} 
                    placeholder={`Enter ${measurementUnit === 'hectares' ? 'area in hectares' : 'distance in kilometers'}`} 
                />

                <CalculateButton onPress={handleCalculate} />

                {consumptionPerUnit !== null && (
                    <ResultDisplay 
                        result={consumptionPerUnit} 
                        label={`Fuel Consumption per ${measurementUnit === 'hectares' ? 'Hectare' : 'Kilometer'}`} 
                        icon="local-gas-station" 
                        iconColor="#607D8B" 
                        unit={`liters/${measurementUnit === 'hectares' ? 'ha' : 'km'}`}
                    />
                )}

                {consumptionPer100Km !== null && (
                    <ResultDisplay 
                        result={consumptionPer100Km} 
                        label="Fuel Consumption per 100 Kilometers" 
                        icon="local-gas-station" 
                        iconColor="#607D8B" 
                        unit='liters/100 km'
                    />
                )}
            </View>
        </CalculatorLayout>
    );
};

export default FuelConsumptionCalculatorScreen;

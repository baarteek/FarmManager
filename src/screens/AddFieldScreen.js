import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { styles } from "../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { useFieldContext } from '../context/FieldProvider';

const AddFieldScreen = () => {
    const navigation = useNavigation();
    const { addField, getNextId } = useFieldContext(); 
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [soilType, setSoilType] = useState('');
    const [plotNumbers, setPlotNumbers] = useState(['']);

    const addPlotNumberField = () => {
        setPlotNumbers([...plotNumbers, '']);
    };

    const handlePlotNumberChange = (index, value) => {
        const updatedPlotNumbers = plotNumbers.map((plot, i) => (i === index ? value : plot));
        setPlotNumbers(updatedPlotNumbers);
    };

    const removePlotNumberField = (index) => {
        const updatedPlotNumbers = plotNumbers.filter((_, i) => i !== index);
        setPlotNumbers(updatedPlotNumbers);
    };

    const handleAddField = () => {
        const newField = {
            id: getNextId(),
            name,
            area: parseFloat(area),
            soilType,
            plotNumbers,
            isActive: true,
            crops: [],
            soilMeasurements: [],
        };
        addField(newField);
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]} >
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Field Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="My Field"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Area (ha)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00 ha"
                    value={area}
                    onChangeText={setArea}
                    keyboardType="numeric"
                />
                <View style={styles.containerWithBorder}>
                    <Text style={[styles.largeText, { textAlign: 'center', marginBottom: '3%' }]}>Plot Numbers</Text>
                    {plotNumbers.map((plotNumber, index) => (
                        <View key={index} style={styles.plotNumberContainer}>
                            <TextInput
                                style={[styles.plotNumberInput]}
                                placeholder={`Plot Number ${index + 1}`}
                                value={plotNumber}
                                onChangeText={(value) => handlePlotNumberChange(index, value)}
                            />
                            <TouchableOpacity style={styles.iconButton} onPress={() => removePlotNumberField(index)}>
                                <Icon name="delete" size={24} color="#FC7F7F" />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.button, { margin: '1%', marginTop: '5%', width: '80%', backgroundColor: '#e6ede9', alignSelf: 'center' }]} onPress={addPlotNumberField}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%' }}>Add Another Plot Number</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerWithBorder}>
                    <Text style={[styles.largeText, { textAlign: 'center', }]}>Select Soil Type</Text>
                    <Picker
                        selectedValue={soilType}
                        onValueChange={(itemValue) => setSoilType(itemValue)}
                    >
                        <Picker.Item label="Loamy" value="Loamy" />
                        <Picker.Item label="Sandy" value="Sandy" />
                        <Picker.Item label="Clay" value="Clay" />
                        <Picker.Item label="Silty" value="Silty" />
                    </Picker>
                </View>
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleAddField}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add New Field</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddFieldScreen;

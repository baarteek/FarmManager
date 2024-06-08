import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../context/FieldProvider';

const EditFieldScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { editField } = useFieldContext();
    const { field } = route.params;

    const [name, setName] = useState(field.name);
    const [area, setArea] = useState(field.area.toString());
    const [soilType, setSoilType] = useState(field.soilType);
    const [plotNumbers, setPlotNumbers] = useState(field.plotNumbers);

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

    const handleSaveField = () => {
        const updatedField = {
            name,
            area: parseFloat(area),
            soilType,
            plotNumbers,
        };
        editField(field.id, updatedField);
        Alert.alert(
            "Field Updated",
            "The field has been successfully updated.",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]} >
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Field Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Field Name"
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
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleSaveField}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Save Field</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditFieldScreen;

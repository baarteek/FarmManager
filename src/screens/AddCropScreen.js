import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../context/FieldProvider';

const AddCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId } = route.params;
    const { fields, addCropToField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);

    const [cropType, setCropType] = useState('');
    const [sowingDate, setSowingDate] = useState('');
    const [harvestDate, setHarvestDate] = useState('');
    const [season, setSeason] = useState('');

    const handleAddCrop = () => {
        const newCrop = {
            id: field.crops.length + 1,
            cropType,
            sowingDate,
            harvestDate,
            season,
            fertilizationHistory: [],
            pestAndDiseaseHistory: [],
        };
        addCropToField(fieldId, newCrop);
        Alert.alert(
            "Crop Added",
            "The new crop has been successfully added.",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]} >
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Crop Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Crop Type"
                    value={cropType}
                    onChangeText={setCropType}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Sowing Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={sowingDate}
                    onChangeText={setSowingDate}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Harvest Date</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={harvestDate}
                    onChangeText={setHarvestDate}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Season</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Season"
                    value={season}
                    onChangeText={setSeason}
                />
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleAddCrop}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add New Crop</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddCropScreen;

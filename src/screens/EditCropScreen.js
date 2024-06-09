import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../context/FieldProvider';

const EditCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId, cropId } = route.params;
    const { fields, editCropInField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);
    const crop = field.crops.find(c => c.id === cropId);

    const [cropType, setCropType] = useState(crop.cropType);
    const [sowingDate, setSowingDate] = useState(crop.sowingDate);
    const [harvestDate, setHarvestDate] = useState(crop.harvestDate);
    const [season, setSeason] = useState(crop.season);

    const handleEditCrop = () => {
        const updatedCrop = {
            ...crop,
            cropType,
            sowingDate,
            harvestDate,
            season
        };
        editCropInField(fieldId, updatedCrop);
        Alert.alert(
            "Crop Updated",
            "The crop has been successfully updated.",
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
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleEditCrop}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Update Crop</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditCropScreen;

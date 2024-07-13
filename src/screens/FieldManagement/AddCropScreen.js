import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../../context/FieldProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../../utils/DateUtils';


const AddCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId } = route.params;
    const { fields, addCropToField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);

    const [cropType, setCropType] = useState('');
    const [sowingDate, setSowingDate] = useState(new Date());
    const [harvestDate, setHarvestDate] = useState(new Date());
    const [season, setSeason] = useState('');

    const handleAddCrop = () => {
        const newCrop = {
            id: field.crops.length + 1,
            cropType,
            sowingDate: formatDate(sowingDate),
            harvestDate: formatDate(harvestDate),
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

    const onChangeSowingDate = (event, selectedDate) => {
        const currentDate = selectedDate || sowingDate;
        setSowingDate(currentDate);
    };

    const onChangeHarvestDate = (event, selectedDate) => {
        const currentDate = selectedDate || harvestDate;
        setHarvestDate(currentDate);
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={sowingDate}
                        mode="date"
                        display="default"
                        onChange={onChangeSowingDate}
                        style={{alignSelf: 'center', marginVertical: '2%'}}
                    />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Harvest Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={harvestDate}
                        mode="date"
                        display="default"
                        onChange={onChangeHarvestDate}
                        style={{alignSelf: 'center', marginVertical: '2%'}}
                    />
                </View>
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

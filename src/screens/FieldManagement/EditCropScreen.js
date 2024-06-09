import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../../context/FieldProvider';
import DateTimePicker from '@react-native-community/datetimepicker';

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
};

const EditCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId, cropId } = route.params;
    const { fields, editCropInField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);
    const crop = field.crops.find(c => c.id === cropId);

    const [cropType, setCropType] = useState(crop.cropType);
    const [sowingDate, setSowingDate] = useState(parseDate(crop.sowingDate));
    const [harvestDate, setHarvestDate] = useState(parseDate(crop.harvestDate));
    const [season, setSeason] = useState(crop.season);

    const handleEditCrop = () => {
        const updatedCrop = {
            ...crop,
            cropType,
            sowingDate: formatDate(sowingDate),
            harvestDate: formatDate(harvestDate),
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
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleEditCrop}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Update Crop</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditCropScreen;

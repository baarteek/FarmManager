import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFieldContext } from '../../context/FieldProvider';
import { styles } from '../../styles/AppStyles';
import { formatDate, parseDate } from '../../utils/DateUtils';

const EditFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId, cropId, fertilizationIndex } = route.params;
    const { fields, editFertilizationInCrop } = useFieldContext();
    const crop = fields.find(f => f.id === fieldId).crops.find(c => c.id === cropId);
    const fertilization = crop.fertilizationHistory[fertilizationIndex];

    const [date, setDate] = useState(parseDate(fertilization.date));
    const [type, setType] = useState(fertilization.type);
    const [quantity, setQuantity] = useState(fertilization.quantity);
    const [method, setMethod] = useState(fertilization.method);
    const [description, setDescription] = useState(fertilization.description);

    const handleEditFertilization = () => {
        const updatedFertilization = {
            date: formatDate(date),
            type,
            quantity,
            method,
            description,
        };
        editFertilizationInCrop(fieldId, cropId, fertilizationIndex, updatedFertilization);
        Alert.alert(
            "Fertilization Updated",
            "The fertilization record has been successfully updated.",
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Fertilization Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        style={{ alignSelf: 'center', marginVertical: '2%' }}
                    />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={type}
                    onChangeText={setType}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Quantity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Method</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Method"
                    value={method}
                    onChangeText={setMethod}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleEditFertilization}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Update Fertilization</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditFertilizationScreen;

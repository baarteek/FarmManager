import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFieldContext } from '../../context/FieldProvider';
import { styles } from '../../styles/AppStyles';

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

const AddFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId, cropId } = route.params;
    const { addFertilizationToCrop } = useFieldContext();

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [method, setMethod] = useState('');
    const [description, setDescription] = useState('');

    const handleAddFertilization = () => {
        const newFertilization = {
            date: formatDate(date),
            type,
            quantity,
            method,
            description,
        };
        addFertilizationToCrop(fieldId, cropId, newFertilization);
        Alert.alert(
            "Fertilization Added",
            "The new fertilization record has been successfully added.",
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
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleAddFertilization}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add Fertilization</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddFertilizationScreen;
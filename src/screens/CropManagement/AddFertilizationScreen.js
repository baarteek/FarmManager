import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { formatDate } from '../../utils/DateUtils';
import { useFertilizationContext } from '../../context/FertilizationProvider';
import FertilizationTypePicker from '../../components/FertilizationTypePicker';
import { formatDecimalInput } from '../../utils/TextUtils';

const AddFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId } = route.params;
    const { addFertilization } = useFertilizationContext();

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [method, setMethod] = useState('');
    const [description, setDescription] = useState('');

    const handleAddFertilization = async () => {
        if (!type || !quantity || !method) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        const newFertilization = {
            cropId,
            date: formatDate(date),
            type: parseInt(type, 10),
            quantity: formatDecimalInput(quantity),
            method,
            description,
        }; 

        try {
            await addFertilization(newFertilization);
            Alert.alert(
                "Fertilization Added",
                "The new fertilization record has been successfully added.",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (err) {
            console.error('Error adding fertilization:', err.message);
            Alert.alert('Error', 'Failed to add the fertilization. Please try again later.');
        }
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
                <View style={styles.containerWithBorder}>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Type</Text>
                    <FertilizationTypePicker
                        setSelectedFertilizationType={setType}
                        selectedFertilizationType={type}
                    />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Quantity</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
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
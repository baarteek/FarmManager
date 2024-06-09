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

const EditSoilMeasurementScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId, measurementIndex } = route.params;
    const { fields, editSoilMeasurementInField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);
    const measurement = field.soilMeasurements[measurementIndex];

    const [date, setDate] = useState(parseDate(measurement.date));
    const [pH, setPH] = useState(measurement.pH);
    const [nitrogen, setNitrogen] = useState(measurement.nitrogen);
    const [phosphorus, setPhosphorus] = useState(measurement.phosphorus);
    const [potassium, setPotassium] = useState(measurement.potassium);

    const handleEditMeasurement = () => {
        const updatedMeasurement = {
            date: formatDate(date),
            pH,
            nitrogen,
            phosphorus,
            potassium,
        };
        editSoilMeasurementInField(fieldId, measurementIndex, updatedMeasurement);
        Alert.alert(
            "Measurement Updated",
            "The soil measurement has been successfully updated.",
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        style={{ alignSelf: 'center', marginVertical: '2%' }}
                    />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>pH</Text>
                <TextInput
                    style={styles.input}
                    placeholder="pH"
                    value={pH}
                    onChangeText={setPH}
                    keyboardType="numeric"
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Nitrogen</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nitrogen"
                    value={nitrogen}
                    onChangeText={setNitrogen}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Phosphorus</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phosphorus"
                    value={phosphorus}
                    onChangeText={setPhosphorus}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Potassium</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Potassium"
                    value={potassium}
                    onChangeText={setPotassium}
                />
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleEditMeasurement}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Update Measurement</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditSoilMeasurementScreen;

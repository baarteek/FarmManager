import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { useFieldContext } from '../../context/FieldProvider';
import { formatDate } from '../../utils/DateUtils';

const AddSoilMeasurementScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId } = route.params;
    const { fields, addSoilMeasurementToField } = useFieldContext();
    const field = fields.find(f => f.id === fieldId);

    const [date, setDate] = useState(new Date());
    const [pH, setPH] = useState('');
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');

    const handleAddMeasurement = () => {
        const newMeasurement = {
            date: formatDate(date),
            pH,
            nitrogen,
            phosphorus,
            potassium,
        };
        addSoilMeasurementToField(fieldId, newMeasurement);
        Alert.alert(
            "Measurement Added",
            "The new soil measurement has been successfully added.",
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
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleAddMeasurement}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add Measurement</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddSoilMeasurementScreen;

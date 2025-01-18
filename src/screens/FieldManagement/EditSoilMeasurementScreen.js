import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { useSoilMeasurementContext } from '../../context/SoilMeasurementProvider';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditSoilMeasurementScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { measurementId, fieldId } = route.params;
    const { fetchSoilMeasurementById, editSoilMeasurement } = useSoilMeasurementContext();

    const [loading, setLoading] = useState(false);

    const [date, setDate] = useState(new Date());
    const [pH, setPH] = useState('');
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');

    useEffect(() => {
        const loadMeasurement = async () => {
            setLoading(true);
            try {
                const measurement = await fetchSoilMeasurementById(measurementId);
                setDate(new Date(measurement.date));
                setPH(measurement.pH.toString());
                setNitrogen(measurement.nitrogen.toString());
                setPhosphorus(measurement.phosphorus.toString());
                setPotassium(measurement.potassium.toString());
            } catch (error) {
                Alert.alert('Error', 'Failed to load soil measurement data.');
            } finally {
                setLoading(false);
            }
        };

        loadMeasurement();
    }, [measurementId]);

    const handleEditMeasurement = async () => {
        if (!pH || !nitrogen || !phosphorus || !potassium) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        const updatedMeasurement = {
            id: measurementId,
            fieldId: fieldId,
            date: date,
            pH: formatDecimalInput(pH),
            nitrogen: formatDecimalInput(nitrogen),
            phosphorus: formatDecimalInput(phosphorus),
            potassium: formatDecimalInput(potassium),
        };

        setLoading(true);
        try {
            await editSoilMeasurement(updatedMeasurement);
            Alert.alert(
                "Measurement Updated",
                "The soil measurement has been successfully updated.",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to update soil measurement. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
            <ScrollView style={styles.mainCantainer}>
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Nitrogen (mg/kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nitrogen"
                    value={nitrogen}
                    onChangeText={setNitrogen}
                    keyboardType="numeric"
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Phosphorus (mg/kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phosphorus"
                    value={phosphorus}
                    onChangeText={setPhosphorus}
                    keyboardType="numeric"
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Potassium (mg/kg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Potassium"
                    value={potassium}
                    onChangeText={setPotassium}
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleEditMeasurement}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>
                            Update Measurement
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
    );
};

export default EditSoilMeasurementScreen;

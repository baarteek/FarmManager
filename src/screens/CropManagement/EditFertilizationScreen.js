import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone'; 
import { styles } from '../../styles/AppStyles';
import { useFertilizationContext } from '../../context/FertilizationProvider';
import FertilizationTypePicker from '../../components/FertilizationTypePicker';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, fertilizationId } = route.params;
    const { fetchFertilizationById, editFertilization } = useFertilizationContext();

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
    const [description, setDescription] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFertilization = async () => {
            try {
                const fertilization = await fetchFertilizationById(fertilizationId);
                if (fertilization) {
                    const localDate = moment.utc(fertilization.date).tz(moment.tz.guess()).toDate();
                    setDate(localDate);
                    setType(fertilization.type.toString());
                    setQuantity(fertilization.quantity.toString());
                    setAgrotechnicalIntervention(fertilization.agrotechnicalIntervention);
                    setDescription(fertilization.description);
                } else {
                    Alert.alert("Error", "Fertilization record not found.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error fetching fertilization:', error);
                Alert.alert("Error", "Failed to load fertilization details.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchFertilization();
    }, [fertilizationId, navigation]);

    const handleSave = async () => {
        if (!type || !quantity || !agrotechnicalIntervention) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        setLoading(true);

        const updatedFertilization = {
            cropId,
            date,
            type: parseInt(type, 10),
            quantity: formatDecimalInput(quantity),
            agrotechnicalIntervention,
            description,
        };

        try {
            await editFertilization(fertilizationId, updatedFertilization);
            Alert.alert(
                "Success",
                "Fertilization updated successfully!",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            console.error('Error updating fertilization:', error);
            Alert.alert('Error', 'Failed to update the fertilization. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            const currentDate = new Date(date);
            currentDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDate(currentDate);
        }
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            const currentDate = new Date(date);
            currentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
            setDate(currentDate);
        }
    };

    if (initialLoading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
            <ScrollView style={styles.mainCantainer}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Fertilization Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        style={{ alignSelf: 'center', marginVertical: '2%' }}
                    />
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Agrotechnical Intervention</Text>
                <AgrotechnicalInterventionList 
                    selectedOption={agrotechnicalIntervention} 
                    setSelectedOption={setAgrotechnicalIntervention} 
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
    );
};

export default EditFertilizationScreen;

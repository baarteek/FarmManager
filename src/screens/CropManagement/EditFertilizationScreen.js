import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { formatDate } from '../../utils/DateUtils';
import { useFertilizationContext } from '../../context/FertilizationProvider';
import FertilizationTypePicker from '../../components/FertilizationTypePicker';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, fertilizationId } = route.params;
    const { fetchFertilizationById, editFertilization } = useFertilizationContext();

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [method, setMethod] = useState('');
    const [description, setDescription] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFertilization = async () => {
            try {
                const fertilization = await fetchFertilizationById(fertilizationId);
                if (fertilization) {
                    setDate(new Date(fertilization.date));
                    setType(fertilization.type.toString());
                    setQuantity(fertilization.quantity.toString());
                    setMethod(fertilization.method);
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
        if (!type || !quantity || !method) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        setLoading(true);

        const updatedFertilization = {
            cropId,
            date: formatDate(date),
            type: parseInt(type, 10),
            quantity: formatDecimalInput(quantity),
            method,
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
            setLoading(false); // Resetuj stan loading po zakończeniu operacji
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    if (initialLoading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

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
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditFertilizationScreen;

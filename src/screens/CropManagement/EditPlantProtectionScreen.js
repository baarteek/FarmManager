import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import { styles } from '../../styles/AppStyles';
import { usePlantProtectionContext } from '../../context/PlantProtectionProvider';
import PlantProtectionTypePicker from '../../components/PlantProtectionTypePicker';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditPlantProtectionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, plantProtectionId } = route.params;
    const { fetchPlantProtectionById, editPlantProtection } = usePlantProtectionContext(); 

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [method, setMethod] = useState('');
    const [description, setDescription] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPlantProtection = async () => {
            try {
                const plantProtection = await fetchPlantProtectionById(plantProtectionId);
                if (plantProtection) {
                    const localDate = moment.utc(plantProtection.date).tz(moment.tz.guess()).toDate();
                    setDate(localDate);
                    setType(plantProtection.type.toString());
                    setQuantity(plantProtection.quantity.toString());
                    setMethod(plantProtection.method);
                    setDescription(plantProtection.description);
                } else {
                    Alert.alert("Error", "Plant protection record not found.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error fetching plant protection:', error);
                Alert.alert("Error", "Failed to load plant protection details.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchPlantProtection();
    }, [plantProtectionId, navigation]);

    const handleSave = async () => {
        if (!type || !quantity || !method) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        setLoading(true);

        const updatedPlantProtection = {
            cropId,
            date,
            type: parseInt(type, 10),
            quantity: formatDecimalInput(quantity),
            method,
            description,
        };

        try {
            await editPlantProtection(plantProtectionId, updatedPlantProtection);
            Alert.alert(
                "Success",
                "Plant protection updated successfully!",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            console.error('Error updating plant protection:', error);
            Alert.alert('Error', 'Failed to update the plant protection. Please try again later.');
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Plant Protection Date</Text>
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
                    <PlantProtectionTypePicker
                        setSelectedPlantProtectionType={setType}
                        selectedPlantProtectionType={type}
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

export default EditPlantProtectionScreen;

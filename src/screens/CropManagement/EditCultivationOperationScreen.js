import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import { styles } from '../../styles/AppStyles';
import { useCultivationOperationContext } from '../../context/CultivationOperationProvider';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';

const EditCultivationOperationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, operationId } = route.params;
    const { fetchCultivationOperationById, editCultivationOperation } = useCultivationOperationContext(); 

    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOperation = async () => {
            try {
                const operation = await fetchCultivationOperationById(operationId);
                if (operation) {
                    const localDate = moment.utc(operation.date).tz(moment.tz.guess()).toDate();
                    setDate(localDate);
                    setName(operation.name);
                    setDescription(operation.description);
                    setAgrotechnicalIntervention(operation.agrotechnicalIntervention);
                } else {
                    Alert.alert("Error", "Cultivation operation not found.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Error fetching cultivation operation:', error);
                Alert.alert("Error", "Failed to load cultivation operation details.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchOperation();
    }, [operationId, navigation]);

    const handleSave = async () => {
        if (!name) {
            Alert.alert('Validation Error', 'Name must be filled in.');
            return;
        }

        setLoading(true);

        const updatedOperation = {
            cropId,
            date,
            name,
            description,
            agrotechnicalIntervention,
        };

        try {
            await editCultivationOperation(operationId, updatedOperation);
            Alert.alert(
                "Success",
                "Cultivation operation updated successfully!",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            console.error('Error updating cultivation operation:', error);
            Alert.alert('Error', 'Failed to update the cultivation operation. Please try again later.');
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center', paddingBottom: '5%', backgroundColor: '#fff' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Cultivation Operation Date</Text>
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <AgrotechnicalInterventionList 
                    selectedOption={agrotechnicalIntervention} 
                    setSelectedOption={setAgrotechnicalIntervention} 
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
        </TouchableWithoutFeedback>
    );
};

export default EditCultivationOperationScreen;

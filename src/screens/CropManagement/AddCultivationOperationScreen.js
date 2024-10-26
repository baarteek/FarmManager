import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { useCultivationOperationContext } from '../../context/CultivationOperationProvider';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';

const AddCultivationOperationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId } = route.params;
    const { addCultivationOperation } = useCultivationOperationContext();

    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
    const [description, setDescription] = useState('');

    const handleAddCultivationOperation = async () => {
        if (!name || !description) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        const newOperation = {
            cropId,
            date,
            name,
            agrotechnicalIntervention,
            description,
        };

        try {
            await addCultivationOperation(newOperation);
            Alert.alert(
                "Cultivation Operation Added",
                "The new cultivation operation has been successfully added.",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (err) {
            console.error('Error adding cultivation operation:', err.message);
            Alert.alert('Error', 'Failed to add the cultivation operation. Please try again later.');
        }
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentDate = selectedTime || date;
        setDate(currentDate);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center', paddingBottom: '5%',  backgroundColor: '#fff' }]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', paddingTop: '5%'}}>
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
                <AgrotechnicalInterventionList selectedOption={agrotechnicalIntervention} setSelectedOption={setAgrotechnicalIntervention} />
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleAddCultivationOperation}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add Operation</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddCultivationOperationScreen;

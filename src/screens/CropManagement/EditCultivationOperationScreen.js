import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import { styles } from '../../styles/AppStyles';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';

const EditCultivationOperationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, operationId } = route.params;

    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOperation = async () => {
            try {
                const storedFarms = await AsyncStorage.getItem('farms');
                if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");

                let farms = JSON.parse(storedFarms);
                let foundOperation = null;

                for (const farm of farms) {
                    for (const field of farm.fields) {
                        for (const crop of field.crops) {
                            if (crop.id === cropId && crop.cultivationOperations) {
                                foundOperation = crop.cultivationOperations.find(op => op.id === operationId);
                                if (foundOperation) break;
                            }
                        }
                    }
                }

                if (foundOperation) {
                    const localDate = moment.utc(foundOperation.date).tz(moment.tz.guess()).toDate();
                    setDate(localDate);
                    setName(foundOperation.name);
                    setDescription(foundOperation.description || '');
                    setAgrotechnicalIntervention(foundOperation.agrotechnicalIntervention);
                } else {
                    Alert.alert("Błąd", "Nie znaleziono zabiegu uprawowego.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Błąd podczas pobierania zabiegu uprawowego:', error);
                Alert.alert("Błąd", "Nie udało się załadować szczegółów.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchOperation();
    }, [cropId, operationId, navigation]);

    const handleSave = async () => {
        if (!name) {
            Alert.alert('Błąd walidacji', 'Nazwa zabiegu musi być wypełniona.');
            return;
        }

        setLoading(true);

        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");

            let farms = JSON.parse(storedFarms);
            let updated = false;

            for (const farm of farms) {
                for (const field of farm.fields) {
                    for (const crop of field.crops) {
                        if (crop.id === cropId && crop.cultivationOperations) {
                            const operationIndex = crop.cultivationOperations.findIndex(op => op.id === operationId);
                            if (operationIndex !== -1) {
                                crop.cultivationOperations[operationIndex] = {
                                    ...crop.cultivationOperations[operationIndex],
                                    date,
                                    name,
                                    description,
                                    agrotechnicalIntervention
                                };
                                updated = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (!updated) {
                throw new Error("Nie znaleziono zabiegu uprawowego do edycji.");
            }

            await AsyncStorage.setItem('farms', JSON.stringify(farms));

            Alert.alert(
                "Sukces",
                "Zabieg uprawowy został pomyślnie zaktualizowany!",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            console.error('Błąd podczas aktualizacji:', error);
            Alert.alert('Błąd', error.message || 'Nie udało się zaktualizować zabiegu uprawowego.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setDate(prevDate => new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                prevDate.getHours(),
                prevDate.getMinutes()
            ));
        }
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            setDate(prevDate => new Date(
                prevDate.getFullYear(),
                prevDate.getMonth(),
                prevDate.getDate(),
                selectedTime.getHours(),
                selectedTime.getMinutes()
            ));
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
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Data zabiegu uprawowego</Text>
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
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa</Text>
            <TextInput 
                style={styles.input}
                placeholder="Wpisz nazwę"
                value={name}
                onChangeText={setName}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz opis"
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>Zapisz zmiany</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditCultivationOperationScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/AppStyles';
import FertilizationTypePicker from '../../components/FertilizationTypePicker';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, fertilizationId } = route.params;

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
                const storedFarms = await AsyncStorage.getItem('farms');
                if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");

                let farms = JSON.parse(storedFarms);
                let foundFertilization = null;

                for (const farm of farms) {
                    for (const field of farm.fields) {
                        for (const crop of field.crops) {
                            if (crop.id === cropId && crop.fertilizations) {
                                foundFertilization = crop.fertilizations.find(f => f.id === fertilizationId);
                                if (foundFertilization) break;
                            }
                        }
                    }
                }

                if (foundFertilization) {
                    const localDate = moment.utc(foundFertilization.date).tz(moment.tz.guess()).toDate();
                    setDate(localDate);
                    setType(foundFertilization.type.toString());
                    setQuantity(foundFertilization.quantity.toString());
                    setAgrotechnicalIntervention(foundFertilization.agrotechnicalIntervention);
                    setDescription(foundFertilization.description);
                } else {
                    Alert.alert("Błąd", "Nie znaleziono nawożenia.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Błąd podczas pobierania nawożenia:', error);
                Alert.alert("Błąd", "Nie udało się załadować danych nawożenia.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchFertilization();
    }, [cropId, fertilizationId, navigation]);

    const handleSave = async () => {
        if (!type || !quantity || !agrotechnicalIntervention) {
            Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
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
                        if (crop.id === cropId && crop.fertilizations) {
                            const fertilizationIndex = crop.fertilizations.findIndex(f => f.id === fertilizationId);
                            if (fertilizationIndex !== -1) {
                                crop.fertilizations[fertilizationIndex] = {
                                    ...crop.fertilizations[fertilizationIndex],
                                    date,
                                    type: parseInt(type, 10),
                                    quantity: formatDecimalInput(quantity),
                                    agrotechnicalIntervention,
                                    description
                                };
                                updated = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (!updated) {
                throw new Error("Nie znaleziono nawożenia do edycji.");
            }

            await AsyncStorage.setItem('farms', JSON.stringify(farms));

            Alert.alert("Sukces", "Dane nawożenia zostały zaktualizowane!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Błąd podczas aktualizacji nawożenia:', error);
            Alert.alert('Błąd', error.message || 'Nie udało się zaktualizować danych nawożenia.');
        } finally {
            setLoading(false);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                return newDate;
            });
        }
    };

    const onChangeTime = (event, selectedTime) => {
        if (selectedTime) {
            setDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());
                return newDate;
            });
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
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Data nawożenia</Text>
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Typ</Text>
                <FertilizationTypePicker
                    setSelectedFertilizationType={setType}
                    selectedFertilizationType={type}
                />
            </View>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Ilość (kg/ha)</Text>
            <TextInput 
                style={styles.input}
                placeholder="Ilość"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Interwencja agrotechniczna</Text>
            <AgrotechnicalInterventionList 
                selectedOption={agrotechnicalIntervention} 
                setSelectedOption={setAgrotechnicalIntervention} 
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
            <TextInput
                style={styles.input}
                placeholder="Opis"
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>Zapisz zmiany</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditFertilizationScreen;
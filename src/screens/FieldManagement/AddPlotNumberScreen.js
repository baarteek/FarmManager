import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/AppStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const AddPlotNumberScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId } = route.params;

    const [parcelNumber, setParcelNumber] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddPlotNumber = async () => {
        if (!parcelNumber.trim() || !area.trim()) {
            Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
            return;
        }

        const newPlotNumber = {
            id: Date.now().toString(),
            fieldId,
            parcelNumber: parcelNumber.trim(),
            area: formatDecimalInput(area),
        };

        setLoading(true);

        try {
            const storedPlots = await AsyncStorage.getItem('plotNumbers');
            const existingPlots = storedPlots ? JSON.parse(storedPlots) : [];

            const updatedPlots = [...existingPlots, newPlotNumber];
            await AsyncStorage.setItem('plotNumbers', JSON.stringify(updatedPlots));

            Alert.alert(
                "Działka dodana",
                "Nowa działka została pomyślnie dodana.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Błąd', 'Nie udało się dodać działki. Spróbuj ponownie później.');
            console.error("Błąd zapisu działki:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Numer działki</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz numer działki"
                value={parcelNumber}
                onChangeText={setParcelNumber}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Powierzchnia (ha)</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz powierzchnię"
                value={area}
                onChangeText={setArea}
                keyboardType="numeric"
            />
            <TouchableOpacity 
                style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                onPress={handleAddPlotNumber}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Dodaj działkę
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddPlotNumberScreen;
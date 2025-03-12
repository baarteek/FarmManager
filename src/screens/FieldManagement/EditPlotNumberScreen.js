import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/AppStyles';
import { formatDecimalInput } from '../../utils/TextUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPlotNumberScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { plotNumberId, fieldId } = route.params;

    const [parcelNumber, setParcelNumber] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPlotNumber = async () => {
            try {
                setLoading(true);
                const storedFarms = await AsyncStorage.getItem('farms');
                if (!storedFarms) throw new Error('Nie znaleziono gospodarstw.');

                let parsedFarms = JSON.parse(storedFarms);
                const farm = parsedFarms.find(f => f.fields && f.fields.some(field => field.id === fieldId));
                if (!farm) throw new Error('Nie znaleziono gospodarstwa.');

                const field = farm.fields?.find(f => f.id === fieldId);
                if (!field) throw new Error('Nie znaleziono pola.');

                // Sprawdzamy, czy działki referencyjne (`plotNumbers`) istnieją
                field.plotNumbers = field.plotNumbers || [];

                const plotNumber = field.plotNumbers.find(p => p.id === plotNumberId);
                if (!plotNumber) throw new Error('Nie znaleziono działki referencyjnej.');

                setParcelNumber(plotNumber.parcelNumber);
                setArea(plotNumber.area.toString());
            } catch (error) {
                Alert.alert('Błąd', error.message || 'Nie udało się załadować danych działki.');
            } finally {
                setLoading(false);
            }
        };

        loadPlotNumber();
    }, [plotNumberId, fieldId]);

    const handleEditPlotNumber = async () => {
        if (!parcelNumber.trim() || !area.trim()) {
            Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
            return;
        }

        try {
            setLoading(true);
            const storedFarms = await AsyncStorage.getItem('farms');
            if (!storedFarms) throw new Error('Nie znaleziono gospodarstw.');

            let parsedFarms = JSON.parse(storedFarms);
            const farmIndex = parsedFarms.findIndex(f => f.fields && f.fields.some(field => field.id === fieldId));
            if (farmIndex === -1) throw new Error('Nie znaleziono gospodarstwa.');

            const fieldIndex = parsedFarms[farmIndex].fields.findIndex(f => f.id === fieldId);
            if (fieldIndex === -1) throw new Error('Nie znaleziono pola.');

            let field = parsedFarms[farmIndex].fields[fieldIndex];

            // Sprawdzamy, czy `plotNumbers` istnieje
            field.plotNumbers = field.plotNumbers || [];

            // Znalezienie i aktualizacja konkretnej działki referencyjnej
            const plotIndex = field.plotNumbers.findIndex(p => p.id === plotNumberId);
            if (plotIndex === -1) throw new Error('Nie znaleziono działki referencyjnej.');

            field.plotNumbers[plotIndex] = {
                id: plotNumberId,
                parcelNumber: parcelNumber.trim(),
                area: formatDecimalInput(area),
            };

            await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

            Alert.alert(
                "Zaktualizowano",
                "Działka referencyjna została pomyślnie zaktualizowana.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Błąd', error.message || 'Nie udało się zaktualizować działki.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Numer działki</Text>
            <TextInput
                style={styles.input}
                placeholder="Numer działki"
                value={parcelNumber}
                onChangeText={setParcelNumber}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Powierzchnia (ha)</Text>
            <TextInput
                style={styles.input}
                placeholder="Powierzchnia"
                value={area}
                onChangeText={setArea}
                keyboardType="numeric"
            />
            <TouchableOpacity
                style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]}
                onPress={handleEditPlotNumber}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>
                        Zaktualizuj działkę
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditPlotNumberScreen;
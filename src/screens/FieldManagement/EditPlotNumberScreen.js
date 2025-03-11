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
                const storedPlotNumbers = await AsyncStorage.getItem('plotNumbers');
                const parsedPlotNumbers = storedPlotNumbers ? JSON.parse(storedPlotNumbers) : [];
                const plotNumber = parsedPlotNumbers.find((plot) => plot.id === plotNumberId);
                if (plotNumber) {
                    setParcelNumber(plotNumber.parcelNumber);
                    setArea(plotNumber.area.toString());
                } else {
                    Alert.alert('Błąd', 'Numer działki nie został znaleziony.');
                }
            } catch (error) {
                Alert.alert('Błąd', 'Nie udało się załadować danych działki.');
            } finally {
                setLoading(false);
            }
        };

        loadPlotNumber();
    }, [plotNumberId]);

    const handleEditPlotNumber = async () => {
        if (!parcelNumber || !area) {
            Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
            return;
        }

        const updatedPlotNumber = {
            id: plotNumberId,
            fieldId,
            parcelNumber,
            area: formatDecimalInput(area),
        };

        try {
            setLoading(true);
            const storedPlotNumbers = await AsyncStorage.getItem('plotNumbers');
            const parsedPlotNumbers = storedPlotNumbers ? JSON.parse(storedPlotNumbers) : [];
            const updatedPlotNumbers = parsedPlotNumbers.map((plot) =>
                plot.id === plotNumberId ? updatedPlotNumber : plot
            );

            await AsyncStorage.setItem('plotNumbers', JSON.stringify(updatedPlotNumbers));

            Alert.alert(
                "Numer działki zaktualizowany",
                "Numer działki został pomyślnie zaktualizowany.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert('Błąd', 'Nie udało się zaktualizować numeru działki. Spróbuj ponownie później.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.mainCantainer}>
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
                        Zaktualizuj numer działki
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditPlotNumberScreen;
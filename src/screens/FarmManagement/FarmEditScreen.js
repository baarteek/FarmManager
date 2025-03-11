import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../styles/AppStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDecimalInput } from '../../utils/TextUtils';

const EditFarmScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadFarmDetails();
    }, []);

    const loadFarmDetails = async () => {
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            const farms = storedFarms ? JSON.parse(storedFarms) : [];
            const farm = farms.find(f => f.id === id);

            if (farm) {
                setName(farm.name);
                setLocation(farm.location);
                setTotalArea(farm.totalArea.toString());
            } else {
                Alert.alert("Błąd", "Nie znaleziono gospodarstwa.");
                navigation.goBack();
            }
        } catch (error) {
            console.error("Błąd wczytywania gospodarstwa:", error);
        }
    };

    const handleEditFarm = async () => {
        if (!name || !totalArea) {
            Alert.alert("Brak danych", "Podaj nazwę oraz powierzchnię gospodarstwa.");
            return;
        }

        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            let farms = storedFarms ? JSON.parse(storedFarms) : [];
            const updatedFarms = farms.map(f =>
                f.id === id ? { ...f, name, location, totalArea: formatDecimalInput(totalArea) } : f
            );

            await AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));

            Alert.alert("Zapisano zmiany", "Dane gospodarstwa zostały zaktualizowane.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Błąd", "Nie udało się zapisać zmian.");
            console.error("Błąd edycji gospodarstwa:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa gospodarstwa</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz nazwę gospodarstwa"
                value={name}
                onChangeText={setName}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Lokalizacja</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz lokalizację gospodarstwa"
                value={location}
                onChangeText={setLocation}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Powierzchnia całkowita (ha)</Text>
            <TextInput
                style={styles.input}
                placeholder="0.00 ha"
                value={totalArea}
                onChangeText={setTotalArea}
                keyboardType="numeric"
            />
            <TouchableOpacity 
                style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#007AFF', alignSelf: 'center' }]} 
                onPress={handleEditFarm}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: 10 }}>
                        Zapisz zmiany
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditFarmScreen;
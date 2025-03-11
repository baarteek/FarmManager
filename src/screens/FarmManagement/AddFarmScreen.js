import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../styles/AppStyles";
import { useNavigation } from "@react-navigation/native";
import { formatDecimalInput } from '../../utils/TextUtils';

const AddFarmScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddFarm = async () => {
        if (!name || !totalArea) {
            Alert.alert(
                "Brak danych",
                "Podaj nazwę oraz powierzchnię gospodarstwa."
            );
            return;
        }

        const newFarm = {
            id: Date.now().toString(),
            name,
            location,
            totalArea: formatDecimalInput(totalArea),
        };

        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            const farms = storedFarms ? JSON.parse(storedFarms) : [];
            const updatedFarms = [...farms, newFarm];

            await AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));

            Alert.alert(
                "Dodano gospodarstwo",
                "Nowe gospodarstwo zostało pomyślnie dodane.",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            Alert.alert(
                "Błąd",
                "Nie udało się dodać gospodarstwa. Spróbuj ponownie."
            );
            console.error("Błąd zapisu gospodarstwa:", error);
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
                style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                onPress={handleAddFarm}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: 10 }}>
                        Dodaj gospodarstwo
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddFarmScreen;
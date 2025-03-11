import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../styles/AppStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { formatDecimalInput } from '../../utils/TextUtils';
import SoilTypePicker from '../../components/SoilTypePicker';

const AddFieldScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { farmId } = route.params;
    const [name, setName] = useState('');
    const [area, setArea] = useState('');
    const [soilType, setSoilType] = useState(null);

    const handleAddField = async () => {
        if (!name || !area || soilType === null) {
            Alert.alert("Błąd", "Wszystkie pola są wymagane.");
            return;
        }

        const newField = {
            id: Date.now().toString(),
            farmId,
            name,
            area: formatDecimalInput(area),
            soilType: parseInt(soilType),
        };

        try {
            const storedFields = await AsyncStorage.getItem('fields');
            const fields = storedFields ? JSON.parse(storedFields) : [];
            const updatedFields = [...fields, newField];

            await AsyncStorage.setItem('fields', JSON.stringify(updatedFields));

            Alert.alert("Dodano pole", "Nowe pole zostało pomyślnie dodane.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            Alert.alert("Błąd", "Nie udało się dodać pola. Spróbuj ponownie.");
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa pola</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz nazwę pola"
                value={name}
                onChangeText={setName}
            />
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Powierzchnia (ha)</Text>
            <TextInput
                style={styles.input}
                placeholder="Wpisz powierzchnię w ha"
                value={area}
                onChangeText={setArea}
                keyboardType="decimal-pad"
            />
            <View style={styles.containerWithBorder}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz rodzaj gleby</Text>
                <SoilTypePicker 
                    selectedSoilType={soilType}
                    setSelectedSoilType={setSoilType}
                />
            </View>
            <TouchableOpacity 
                style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                onPress={handleAddField}
            >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                    Dodaj Pole
                </Text>
            </TouchableOpacity>
            <View style={[styles.line, {borderColor: '#525252'}]} />
            <TouchableOpacity 
                style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#525252', alignSelf: 'center' }]} 
                onPress={() => navigation.navigate('Dodaj Pola z Pliku', { farmId })}
            >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                    Dodaj Pola z Pliku
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddFieldScreen;
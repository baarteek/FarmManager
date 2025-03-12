import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/AppStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDecimalInput } from '../../utils/TextUtils';
import SoilTypePicker from '../../components/SoilTypePicker';

const EditFieldScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { farmId, field } = route.params;

    const [name, setName] = useState(field.name);
    const [area, setArea] = useState(field.area);
    const [soilType, setSoilType] = useState(field.soilType);

    const handleSaveField = async () => {
        if (!name || !area || soilType === null) {
            Alert.alert("Błąd", "Wszystkie pola są wymagane.");
            return;
        }

        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (storedFarms) {
                let farms = JSON.parse(storedFarms);
                const farmIndex = farms.findIndex(f => f.id === farmId);

                if (farmIndex !== -1) {
                    let fields = farms[farmIndex].fields || [];
                    const fieldIndex = fields.findIndex(f => f.id === field.id);

                    if (fieldIndex !== -1) {
                        fields[fieldIndex] = { 
                            ...fields[fieldIndex], 
                            name, 
                            area: formatDecimalInput(area), 
                            soilType 
                        };
                        farms[farmIndex].fields = fields;
                        await AsyncStorage.setItem('farms', JSON.stringify(farms));

                        Alert.alert("Zapisano", "Pole zostało zaktualizowane.", [
                            { text: "OK", onPress: () => navigation.goBack() }
                        ]);
                    }
                }
            }
        } catch (error) {
            console.error("Błąd aktualizacji pola:", error);
            Alert.alert("Błąd", "Nie udało się zapisać zmian. Spróbuj ponownie.");
        }
    };

    return (
        <ScrollView style={styles.mainCantainer}>
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
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz typ gleby</Text>
                <SoilTypePicker 
                    selectedSoilType={soilType}
                    setSelectedSoilType={setSoilType}
                />
            </View>
            <TouchableOpacity 
                style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                onPress={handleSaveField}
            >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                    Zapisz zmiany
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditFieldScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Switch, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/AppStyles';
import CropTypePicker from '../../components/CropTypePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, fieldId, farmId } = route.params;
    

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCrop = async () => {
            try {
                const storedFarms = await AsyncStorage.getItem('farms');
                let parsedFarms = storedFarms ? JSON.parse(storedFarms) : [];
    
                const farm = parsedFarms.find(f => f.id === farmId);
                if (!farm) throw new Error("Nie znaleziono gospodarstwa.");
    
                const field = farm.fields.find(f => f.id === fieldId);
                if (!field) throw new Error("Nie znaleziono pola.");
    
                const crop = field.crops.find(c => c.id === cropId);
                if (!crop) throw new Error("Nie znaleziono uprawy.");
    
                setName(crop.name);
                setType(crop.type ? crop.type.toString() : "");
                setIsActive(crop.isActive);
            } catch (error) {
                console.error("Błąd podczas pobierania danych uprawy:", error);
                Alert.alert("Błąd", error.message);
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
    
        loadCrop();
    }, [cropId, fieldId, farmId, navigation]);

    const handleSave = async () => {
        if (!name || !type) {
            Alert.alert("Brakujące informacje", "Podaj wszystkie wymagane dane.");
            return;
        }

        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            let parsedFarms = storedFarms ? JSON.parse(storedFarms) : [];

            const farmIndex = parsedFarms.findIndex(f => f.id === farmId);
            if (farmIndex === -1) throw new Error("Nie znaleziono gospodarstwa.");

            const fieldIndex = parsedFarms[farmIndex].fields.findIndex(f => f.id === fieldId);
            if (fieldIndex === -1) throw new Error("Nie znaleziono pola.");

            const cropIndex = parsedFarms[farmIndex].fields[fieldIndex].crops.findIndex(c => c.id === cropId);
            if (cropIndex === -1) throw new Error("Nie znaleziono uprawy.");

            parsedFarms[farmIndex].fields[fieldIndex].crops[cropIndex] = {
                ...parsedFarms[farmIndex].fields[fieldIndex].crops[cropIndex],
                name,
                type: parseInt(type, 10),
                isActive
            };

            // Zapisz zmiany
            await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

            Alert.alert("Sukces", "Zapisano zmiany!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error("Błąd podczas zapisywania uprawy:", error);
            Alert.alert("Błąd", error.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.mainCantainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa uprawy</Text>
            <TextInput
                style={styles.input}
                placeholder="Wprowadź nazwę uprawy"
                value={name}
                onChangeText={setName}
            />
            <View style={[styles.infoRowContainer, styles.containerWithBorder, { marginVertical: '1%', justifyContent: 'space-around', paddingVertical: '1%' }]}>
                <Text style={[styles.largeText, { padding: '1%' }]}>Aktywna</Text>
                <Switch value={isActive} onValueChange={setIsActive} />
            </View>
            <View style={styles.containerWithBorder}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz typ uprawy</Text>
                <CropTypePicker selectedCropType={type} setSelectedCropType={setType} />
            </View>
            <TouchableOpacity
                style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]}
                onPress={handleSave}
            >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: 10 }}>
                    Zapisz zmiany
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditCropScreen;
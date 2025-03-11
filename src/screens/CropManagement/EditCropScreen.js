import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/AppStyles';
import CropTypePicker from '../../components/CropTypePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCrop = async () => {
            try {
                const storedCrops = await AsyncStorage.getItem('crops');
                const crops = storedCrops ? JSON.parse(storedCrops) : [];

                const crop = crops.find(crop => crop.id === id);

                if (crop) {
                    setName(crop.name);
                    setType(crop.type.toString());
                    setIsActive(crop.isActive);
                } else {
                    Alert.alert("Błąd", "Nie znaleziono uprawy.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Błąd podczas pobierania danych uprawy:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCrop();
    }, [id, navigation]);

    const handleSave = async () => {
        if (!name || !type) {
            Alert.alert("Brakujące informacje", "Podaj wszystkie wymagane dane.");
            return;
        }

        try {
            const storedCrops = await AsyncStorage.getItem('crops');
            let crops = storedCrops ? JSON.parse(storedCrops) : [];

            const cropIndex = crops.findIndex(crop => crop.id === id);
            if (cropIndex !== -1) {
                crops[cropIndex] = {
                    ...crops[cropIndex],
                    name,
                    type: parseInt(type, 10),
                    isActive
                };

                await AsyncStorage.setItem('crops', JSON.stringify(crops));

                Alert.alert("Sukces", "Zapisano zmiany!", [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert("Błąd", "Nie znaleziono uprawy do edycji.");
            }
        } catch (error) {
            console.error("Błąd podczas zapisywania uprawy:", error);
            Alert.alert("Błąd", "Nie udało się zapisać zmian.");
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
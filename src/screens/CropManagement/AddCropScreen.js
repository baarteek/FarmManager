import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/AppStyles';
import { Picker } from '@react-native-picker/picker';
import CropTypePicker from '../../components/CropTypePicker';

const AddCropScreen = () => {
    const navigation = useNavigation();
    
    const [farms, setFarms] = useState([]);
    const [selectedFarmId, setSelectedFarmId] = useState('');
    const [selectedFieldId, setSelectedFieldId] = useState('');
    const [fields, setFields] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);

    const fetchFarms = async () => {
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            const parsedFarms = storedFarms ? JSON.parse(storedFarms) : [];
            setFarms(parsedFarms);
            if (parsedFarms.length > 0) {
                setSelectedFarmId(parsedFarms[0].id);
                fetchFields(parsedFarms[0].id);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania gospodarstw:", error);
        }
    };

    const fetchFields = (farmId) => {
        const farm = farms.find(f => f.id === farmId);
        if (farm && farm.fields.length > 0) {
            setFields(farm.fields);
            setSelectedFieldId(farm.fields[0].id);
        } else {
            setFields([]);
            setSelectedFieldId('');
        }
    };

    useEffect(() => {
        fetchFarms().then(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedFarmId) {
            fetchFields(selectedFarmId);
        }
    }, [selectedFarmId]);

    const handleSave = async () => {
        if (!name.trim() || !type || !selectedFieldId) {
            Alert.alert("Brakujące informacje", "Podaj wszystkie wymagane dane dla uprawy.");
            return;
        }

        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");
            
            let parsedFarms = JSON.parse(storedFarms);
            const farmIndex = parsedFarms.findIndex(f => f.id === selectedFarmId);
            if (farmIndex === -1) throw new Error("Nie znaleziono gospodarstwa.");

            const fieldIndex = parsedFarms[farmIndex].fields.findIndex(f => f.id === selectedFieldId);
            if (fieldIndex === -1) throw new Error("Nie znaleziono pola.");

            let field = parsedFarms[farmIndex].fields[fieldIndex];

            field.crops = field.crops || [];

            field.crops.push({
                id: Date.now().toString(),
                name: name.trim(),
                type: parseInt(type, 10),
                isActive
            });

            await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

            Alert.alert("Sukces", "Uprawa została dodana!", [{ text: "OK", onPress: () => navigation.goBack() }]);
        } catch (error) {
            Alert.alert("Błąd", error.message || "Nie udało się dodać uprawy. Spróbuj ponownie.");
        }
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (farms.length === 0) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    Brak gospodarstw. Dodaj gospodarstwo przed kontynuacją.
                </Text>
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={() => navigation.navigate('Dodaj Gospodarstwo')}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Dodaj Gospodarstwo
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.mainContainer}>
            {step === 1 && (
                <>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz Gospodarstwo</Text>
                    <Picker
                        selectedValue={selectedFarmId}
                        onValueChange={(itemValue) => {
                            setSelectedFarmId(itemValue);
                            fetchFields(itemValue);
                        }}
                        style={styles.picker}
                    >
                        {farms.map(farm => (
                            <Picker.Item key={farm.id} label={farm.name} value={farm.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity 
                        style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                        onPress={() => setStep(2)}
                        disabled={!selectedFarmId}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                            Dalej
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz Pole</Text>
                    <Picker
                        selectedValue={selectedFieldId}
                        onValueChange={(itemValue) => setSelectedFieldId(itemValue)}
                        style={styles.picker}
                    >
                        {fields.map(field => (
                            <Picker.Item key={field.id} label={field.name} value={field.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity 
                        style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                        onPress={() => setStep(3)}
                        disabled={!selectedFieldId}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                            Dalej
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 3 && (
                <>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa Uprawy</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Podaj nazwę uprawy"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={[styles.infoRowContainer, styles.containerWithBorder, { justifyContent: 'space-around' }]}>
                        <Text style={[styles.largeText]}>Czy aktywna?</Text>
                        <Switch value={isActive} onValueChange={setIsActive} />
                    </View>
                    <View style={styles.containerWithBorder}>
                        <Text style={[styles.largeText, { textAlign: 'center' }]}>Wybierz Typ Uprawy</Text>
                        <CropTypePicker selectedCropType={type} setSelectedCropType={setType} />
                    </View>
                    <TouchableOpacity style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleSave}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                            Dodaj Uprawę
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
};

export default AddCropScreen;
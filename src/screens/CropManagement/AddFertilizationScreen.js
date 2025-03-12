import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import FertilizationTypePicker from '../../components/FertilizationTypePicker';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import { formatDecimalInput } from '../../utils/TextUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFertilizationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cropId } = route.params;

  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFertilization = async () => {
    if (!type || !quantity || !agrotechnicalIntervention) {
      Alert.alert("Błąd walidacji", "Wszystkie pola muszą być wypełnione.");
      return;
    }

    const newFertilization = {
      id: Date.now().toString(),
      date: date.toISOString(),
      type: parseInt(type, 10),
      quantity: formatDecimalInput(quantity),
      agrotechnicalIntervention, 
      description: description.trim(),
    };

    setLoading(true);
    try {
      const storedFarms = await AsyncStorage.getItem('farms');
      if (!storedFarms) throw new Error("Nie znaleziono danych o gospodarstwach.");

      let parsedFarms = JSON.parse(storedFarms);

      let found = false;

      for (const farm of parsedFarms) {
        for (const field of farm.fields) {
          const cropIndex = field.crops.findIndex(crop => crop.id === cropId);
          if (cropIndex !== -1) {
            if (!field.crops[cropIndex].fertilizations) {
              field.crops[cropIndex].fertilizations = [];
            }
            field.crops[cropIndex].fertilizations.push(newFertilization);
            found = true;
            break;
          }
        }
        if (found) break;
      }

      if (!found) throw new Error("Nie znaleziono uprawy.");

      await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

      Alert.alert(
        "Sukces",
        "Nowe nawożenie zostało dodane.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.error('Błąd podczas dodawania nawożenia:', err.message);
      Alert.alert("Błąd", err.message || "Nie udało się dodać nawożenia. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.mainCantainer}>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Data nawożenia</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={{ alignSelf: 'center', marginVertical: '2%' }}
        />
      </View>
      <View style={styles.containerWithBorder}>
        <Text style={[styles.largeText, { textAlign: 'center' }]}>Rodzaj nawożenia</Text>
        <FertilizationTypePicker
          setSelectedFertilizationType={setType}
          selectedFertilizationType={type}
        />
      </View>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Ilość (kg/ha)</Text>
      <TextInput 
        style={styles.input}
        placeholder="Wprowadź ilość"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Interwencja agrotechniczna</Text>
      <AgrotechnicalInterventionList 
        selectedOption={agrotechnicalIntervention} 
        setSelectedOption={setAgrotechnicalIntervention} 
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
      <TextInput
        style={styles.input}
        placeholder="Dodaj opis"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity 
        style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
        onPress={handleAddFertilization}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Dodaj nawożenie
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddFertilizationScreen;
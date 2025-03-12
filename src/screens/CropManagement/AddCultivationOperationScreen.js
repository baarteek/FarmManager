import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCultivationOperationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cropId } = route.params;

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCultivationOperation = async () => {
    if (!name.trim()) {
      Alert.alert("Błąd walidacji", "Nazwa jest wymagana.");
      return;
    }

    const newOperation = {
      id: Date.now().toString(),
      date: date.toISOString(),
      name: name.trim(),
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
            if (!field.crops[cropIndex].cultivationOperations) {
              field.crops[cropIndex].cultivationOperations = [];
            }
            field.crops[cropIndex].cultivationOperations.push(newOperation);
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
        "Nowy zabieg uprawowy został dodany.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.error('Błąd podczas dodawania zabiegu uprawowego:', err.message);
      Alert.alert("Błąd", err.message || "Nie udało się dodać zabiegu uprawowego. Spróbuj ponownie później.");
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
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Data zabiegu uprawowego</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={{ alignSelf: 'center', marginVertical: '2%' }}
        />
      </View>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa</Text>
      <TextInput 
        style={styles.input}
        placeholder="Wprowadź nazwę"
        value={name}
        onChangeText={setName}
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
      <TextInput
        style={styles.input}
        placeholder="Wprowadź opis"
        value={description}
        onChangeText={setDescription}
      />
      <AgrotechnicalInterventionList 
        selectedOption={agrotechnicalIntervention} 
        setSelectedOption={setAgrotechnicalIntervention} 
      />
      <TouchableOpacity 
        style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
        onPress={handleAddCultivationOperation}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Dodaj zabieg uprawowy
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddCultivationOperationScreen;
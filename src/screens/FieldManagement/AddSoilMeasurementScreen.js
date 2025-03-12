import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const AddSoilMeasurementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { fieldId } = route.params; // Pobiera tylko fieldId
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [pH, setPH] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');

  const handleAddMeasurement = async () => {
    if (!pH || !nitrogen || !phosphorus || !potassium) {
      Alert.alert('Błąd walidacji', 'Wszystkie pola muszą zostać wypełnione.');
      return;
    }

    const newMeasurement = {
      id: Date.now().toString(),
      date: date.toISOString(),
      pH: formatDecimalInput(pH),
      nitrogen: formatDecimalInput(nitrogen),
      phosphorus: formatDecimalInput(phosphorus),
      potassium: formatDecimalInput(potassium),
    };

    setLoading(true);

    try {
      const storedFarms = await AsyncStorage.getItem('farms');
      if (!storedFarms) throw new Error('Nie znaleziono gospodarstw.');

      let parsedFarms = JSON.parse(storedFarms);
      let farmFound = false;
      
      parsedFarms = parsedFarms.map(farm => {
        const updatedFields = farm.fields.map(field => {
          if (field.id === fieldId) {
            farmFound = true;

            if (!field.soilMeasurements) {
              field.soilMeasurements = [];
            }
            
            return { 
              ...field, 
              soilMeasurements: [...field.soilMeasurements, newMeasurement] 
            };
          }
          return field;
        });

        return { ...farm, fields: updatedFields };
      });

      if (!farmFound) throw new Error('Nie znaleziono pola.');

      await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

      Alert.alert(
        "Pomiar dodany",
        "Nowy pomiar gleby został pomyślnie dodany.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error("Błąd dodawania pomiaru:", error);
      Alert.alert('Błąd', 'Nie udało się dodać pomiaru gleby. Spróbuj ponownie później.');
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
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Data</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={{ alignSelf: 'center', marginVertical: '2%' }}
        />
      </View>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>pH</Text>
      <TextInput
        style={styles.input}
        placeholder="pH"
        value={pH}
        onChangeText={setPH}
        keyboardType="numeric"
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Azot (mg/kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Azot"
        value={nitrogen}
        onChangeText={setNitrogen}
        keyboardType="numeric"
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Fosfor (mg/kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Fosfor"
        value={phosphorus}
        onChangeText={setPhosphorus}
        keyboardType="numeric"
      />
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Potas (mg/kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Potas"
        value={potassium}
        onChangeText={setPotassium}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
        onPress={handleAddMeasurement}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Dodaj pomiar
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddSoilMeasurementScreen;
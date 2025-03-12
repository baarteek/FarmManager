import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditSoilMeasurementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { measurementId, fieldId } = route.params;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [pH, setPH] = useState('');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');

  useEffect(() => {
    const loadMeasurement = async () => {
      setLoading(true);
      try {
        const storedFarms = await AsyncStorage.getItem('farms');
        if (!storedFarms) throw new Error('Nie znaleziono gospodarstw.');

        const parsedFarms = JSON.parse(storedFarms);
        const farm = parsedFarms.find(farm => farm.fields.some(field => field.id === fieldId));
        if (!farm) throw new Error('Nie znaleziono gospodarstwa.');

        const field = farm.fields.find(f => f.id === fieldId);
        if (!field) throw new Error('Nie znaleziono pola.');

        const measurement = field.soilMeasurements?.find(m => m.id === measurementId);
        if (!measurement) {
          Alert.alert('Błąd', 'Pomiar nie został znaleziony.');
          return;
        }

        setDate(new Date(measurement.date));
        setPH(measurement.pH.toString());
        setNitrogen(measurement.nitrogen.toString());
        setPhosphorus(measurement.phosphorus.toString());
        setPotassium(measurement.potassium.toString());

      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się załadować danych pomiaru gleby.');
      } finally {
        setLoading(false);
      }
    };

    loadMeasurement();
  }, [measurementId, fieldId]);

  const handleEditMeasurement = async () => {
    if (!pH || !nitrogen || !phosphorus || !potassium) {
      Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
      return;
    }

    const updatedMeasurement = {
      id: measurementId,
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
      const farmIndex = parsedFarms.findIndex(f => f.fields.some(field => field.id === fieldId));
      if (farmIndex === -1) throw new Error('Nie znaleziono gospodarstwa.');

      const fieldIndex = parsedFarms[farmIndex].fields.findIndex(f => f.id === fieldId);
      if (fieldIndex === -1) throw new Error('Nie znaleziono pola.');

      let measurements = parsedFarms[farmIndex].fields[fieldIndex].soilMeasurements || [];
      parsedFarms[farmIndex].fields[fieldIndex].soilMeasurements = measurements.map(m =>
        m.id === measurementId ? updatedMeasurement : m
      );

      await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));

      Alert.alert(
        "Pomiar zaktualizowany",
        "Pomiar gleby został pomyślnie zaktualizowany.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować pomiaru gleby. Spróbuj ponownie później.');
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
        onPress={handleEditMeasurement}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Zaktualizuj pomiar
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditSoilMeasurementScreen;
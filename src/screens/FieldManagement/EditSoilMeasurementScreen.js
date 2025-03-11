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
        const storedMeasurements = await AsyncStorage.getItem('soilMeasurements');
        const parsedMeasurements = storedMeasurements ? JSON.parse(storedMeasurements) : [];
        const measurement = parsedMeasurements.find(m => m.id === measurementId);
        if (measurement) {
          setDate(new Date(measurement.date));
          setPH(measurement.pH.toString());
          setNitrogen(measurement.nitrogen.toString());
          setPhosphorus(measurement.phosphorus.toString());
          setPotassium(measurement.potassium.toString());
        } else {
          Alert.alert('Błąd', 'Pomiar nie został znaleziony.');
        }
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się załadować danych pomiaru gleby.');
      } finally {
        setLoading(false);
      }
    };

    loadMeasurement();
  }, [measurementId]);

  const handleEditMeasurement = async () => {
    if (!pH || !nitrogen || !phosphorus || !potassium) {
      Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione.');
      return;
    }

    const updatedMeasurement = {
      id: measurementId,
      fieldId,
      date: date.toISOString(),
      pH: formatDecimalInput(pH),
      nitrogen: formatDecimalInput(nitrogen),
      phosphorus: formatDecimalInput(phosphorus),
      potassium: formatDecimalInput(potassium),
    };

    setLoading(true);
    try {
      const storedMeasurements = await AsyncStorage.getItem('soilMeasurements');
      const parsedMeasurements = storedMeasurements ? JSON.parse(storedMeasurements) : [];
      const updatedMeasurements = parsedMeasurements.map(m =>
        m.id === measurementId ? updatedMeasurement : m
      );

      await AsyncStorage.setItem('soilMeasurements', JSON.stringify(updatedMeasurements));

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
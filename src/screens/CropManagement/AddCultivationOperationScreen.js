import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    if (!name) {
      Alert.alert("Błąd walidacji", "Nazwa jest wymagana.");
      return;
    }

    const newOperation = {
      id: Date.now().toString(),
      cropId,
      date,
      name,
      agrotechnicalIntervention,
      description,
    };

    setLoading(true);
    try {
      const storedOperations = await AsyncStorage.getItem('cultivationOperations');
      const operations = storedOperations ? JSON.parse(storedOperations) : [];
      const updatedOperations = [...operations, newOperation];
      await AsyncStorage.setItem('cultivationOperations', JSON.stringify(updatedOperations));
      Alert.alert(
        "Sukces",
        "Nowy zabieg uprawowy został dodany.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.error('Błąd podczas dodawania zabiegu uprawowego:', err.message);
      Alert.alert("Błąd", "Nie udało się dodać zabiegu uprawowego. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentDate = selectedTime || date;
    setDate(currentDate);
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
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
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
      <AgrotechnicalInterventionList selectedOption={agrotechnicalIntervention} setSelectedOption={setAgrotechnicalIntervention} />
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
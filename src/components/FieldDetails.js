import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { formatDate } from '../utils/DateUtils';

const soilTypeMap = {
  0: "Nie wybrano",
  1: "Gleba brunatna",
  2: "Czarnoziem",
  3: "Gleba bielicowa",
  4: "Gleba płowa",
  5: "Torf",
  6: "Histosol",
  7: "Mady",
  8: "Rędzina",
  9: "Less",
  10: "Gleba gliniasta",
  11: "Gleba piaszczysta",
  12: "Inna"
};

const FieldDetails = ({ fieldData, onDelete, onEdit }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [soilMeasurements, setSoilMeasurements] = useState([]);
  const [plotNumbers, setPlotNumbers] = useState([]);

  const refreshData = async () => {
    try {
      const storedMeasurements = await AsyncStorage.getItem('soilMeasurements');
      const storedPlots = await AsyncStorage.getItem('plotNumbers');
      const measurements = storedMeasurements ? JSON.parse(storedMeasurements) : [];
      const plots = storedPlots ? JSON.parse(storedPlots) : [];
      setSoilMeasurements(measurements.filter(m => m.fieldId === fieldData.id));
      setPlotNumbers(plots.filter(p => p.fieldId === fieldData.id));
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [fieldData.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshData);
    return unsubscribe;
  }, [navigation, fieldData.id]);

  const parseDate = (dateString) => new Date(dateString);

  const sortedSoilMeasurements = soilMeasurements
    .map(m => ({ ...m }))
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const handleMeasurementClick = (measurement) => {
    const details = {
      Data: formatDate(parseDate(measurement.date)),
      pH: `${measurement.pH}`,
      Azot: `${measurement.nitrogen} mg/kg`,
      Fosfor: `${measurement.phosphorus} mg/kg`,
      Potas: `${measurement.potassium} mg/kg`
    };
    setSelectedDetails(details);
    setModalTitle(formatDate(parseDate(measurement.date)));
    setModalVisible(true);
  };

  const handleParcelClick = (parcel) => {
    const details = {
      "Numer działki": parcel.parcelNumber,
      "Powierzchnia": `${parcel.area} ha`
    };
    setSelectedDetails(details);
    setModalTitle(parcel.parcelNumber);
    setModalVisible(true);
  };

  const handleDeleteMeasurement = async (id) => {
    Alert.alert(
      "Usuń pomiar gleby",
      "Czy na pewno chcesz usunąć ten pomiar gleby?",
      [
        { text: "Anuluj", style: "cancel" },
        { text: "Usuń", onPress: async () => {
            try {
              const updatedMeasurements = soilMeasurements.filter(m => m.id !== id);
              await AsyncStorage.setItem('soilMeasurements', JSON.stringify(updatedMeasurements));
              refreshData();
            } catch (error) {
              console.error("Error deleting measurement:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleDeletePlotNumber = async (id) => {
    Alert.alert(
      "Usuń działkę referencyjną",
      "Czy na pewno chcesz usunąć tę działkę?",
      [
        { text: "Anuluj", style: "cancel" },
        { text: "Usuń", onPress: async () => {
            try {
              const updatedPlots = plotNumbers.filter(p => p.id !== id);
              await AsyncStorage.setItem('plotNumbers', JSON.stringify(updatedPlots));
              refreshData();
            } catch (error) {
              console.error("Error deleting plot number:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ExpandableComponent title={fieldData.name}>
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Powierzchnia</Text>
          <Text style={styles.text}>{fieldData.area} ha</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Typ gleby</Text>
          <Text style={styles.text}>{soilTypeMap[fieldData.soilType] || "Nieznany typ gleby"}</Text>
        </View>
        <View style={styles.line} />
        <ExpandableComponent title="Pomiary gleby" isExpanded={false} backgroundColor="#BAF1BA">
          {sortedSoilMeasurements.length > 0 ? (
            sortedSoilMeasurements.map(measurement => (
              <View key={measurement.id} style={styles.infoRowContainer}>
                <TouchableOpacity style={{ width: '70%' }} onPress={() => handleMeasurementClick(measurement)}>
                  <View style={styles.rowContainer}>
                    <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                    <Text style={styles.text}>{formatDate(parseDate(measurement.date))}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Edytuj Pomiar Gleby", { measurementId: measurement.id, fieldId: fieldData.id })}>
                  <Icon name="edit" size={22} color="#00BFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteMeasurement(measurement.id)}>
                  <Icon name="delete" size={22} color="#FC7F7F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.text, { textAlign: 'center' }]}>Brak pomiarów gleby dla tego pola</Text>
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: '#62C962', marginVertical: '5%' }]} onPress={() => navigation.navigate('Dodaj Pomiar Gleby', { fieldId: fieldData.id })}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Dodaj Pomiar Gleby</Text>
          </TouchableOpacity>
        </ExpandableComponent>
        <ExpandableComponent title="Działki referencyjne" isExpanded={false} backgroundColor="#BAF1BA">
          {plotNumbers.length > 0 ? (
            plotNumbers.map(parcel => (
              <View key={parcel.id} style={styles.infoRowContainer}>
                <TouchableOpacity style={{ width: '70%' }} onPress={() => handleParcelClick(parcel)}>
                  <View style={styles.rowContainer}>
                    <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                    <Text style={[styles.text, { fontSize: 15 }]}>{parcel.parcelNumber}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Edytuj Numer Działki', { plotNumberId: parcel.id, fieldId: fieldData.id })}>
                  <Icon name="edit" size={22} color="#00BFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePlotNumber(parcel.id)}>
                  <Icon name="delete" size={22} color="#FC7F7F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.text, { textAlign: 'center' }]}>Brak działek referencyjnych</Text>
          )}
          <TouchableOpacity style={[styles.button, { backgroundColor: '#62C962', marginVertical: '5%' }]} onPress={() => navigation.navigate('Dodaj Numer Działki', { fieldId: fieldData.id })}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Dodaj Działkę</Text>
          </TouchableOpacity>
        </ExpandableComponent>
        <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} onPress={onEdit}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Edytuj Pole</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FC7F7F' }]} onPress={onDelete}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', paddingHorizontal: '5%' }}>Usuń Pole</Text>
          </TouchableOpacity>
        </View>
        <DetailsModal visible={modalVisible} onClose={() => setModalVisible(false)} title={modalTitle} details={selectedDetails} />
      </ExpandableComponent>
    </View>
  );
};

export default FieldDetails;
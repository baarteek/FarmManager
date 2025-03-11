import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { formatDate, formatTime } from '../utils/DateUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cropTypeMapping = {
  0: "Nie wybrano",
  1: "Zboże",
  2: "Warzywo",
  3: "Owoc",
  4: "Roślina strączkowa",
  5: "Roślina oleista",
  6: "Roślina korzeniowa",
  7: "Roślina bulwiasta",
  8: "Roślina pastewna",
  9: "Roślina włóknista",
  10: "Przyprawa",
  11: "Roślina lecznicza",
  12: "Roślina ozdobna",
  13: "Inna"
};

const CropDetails = ({ crop, handleDeleteCrop }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [fieldName, setFieldName] = useState("Ładowanie...");
  const [farmName, setFarmName] = useState("Ładowanie...");
  const [cropTypeName, setCropTypeName] = useState(cropTypeMapping[crop.type] || "Nieznany typ");
  const [fertilizations, setFertilizations] = useState([]);
  const [plantProtections, setPlantProtections] = useState([]);
  const [cultivationOperations, setCultivationOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const storedFields = await AsyncStorage.getItem('fields');
      const storedFarms = await AsyncStorage.getItem('farms');
      const storedFertilizations = await AsyncStorage.getItem('fertilizations');
      const storedPlantProtections = await AsyncStorage.getItem('plantProtections');
      const storedCultivationOperations = await AsyncStorage.getItem('cultivationOperations');

      const fields = storedFields ? JSON.parse(storedFields) : [];
      const farms = storedFarms ? JSON.parse(storedFarms) : [];
      const fertilizationsData = storedFertilizations ? JSON.parse(storedFertilizations) : [];
      const plantProtectionsData = storedPlantProtections ? JSON.parse(storedPlantProtections) : [];
      const cultivationOperationsData = storedCultivationOperations ? JSON.parse(storedCultivationOperations) : [];

      const field = fields.find(f => f.id === crop.fieldId);
      setFieldName(field ? field.name : "Nieznane pole");

      if (field) {
        const farm = farms.find(f => f.id === field.farmId);
        setFarmName(farm ? farm.name : "Nieznane gospodarstwo");
      } else {
        setFarmName("Nieznane gospodarstwo");
      }

      setFertilizations(fertilizationsData.filter(f => f.cropId === crop.id));
      setPlantProtections(plantProtectionsData.filter(p => p.cropId === crop.id));
      setCultivationOperations(cultivationOperationsData.filter(c => c.cropId === crop.id));
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    } finally {
      setLoading(false);
    }
  };

  // Listener, który odświeża dane przy każdym wejściu na ekran
  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  // Funkcje obsługujące Zabiegi Uprawowe
  const handleCultivationOperationClick = (operation) => {
    setSelectedDetails({
      "Nazwa": operation.name,
      "Data": formatDate(operation.date),
      "Godzina": formatTime(operation.date),
      "Interwencja": operation.agrotechnicalIntervention,
      "Opis": operation.description || "Brak opisu",
    });
    setModalTitle("Szczegóły zabiegu uprawowego");
    setModalVisible(true);
  };

  const handleDeleteOperation = async (id) => {
    Alert.alert("Usuń zabieg uprawowy", "Czy na pewno chcesz usunąć ten zabieg?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          try {
            const storedOperations = await AsyncStorage.getItem('cultivationOperations');
            const parsedOperations = storedOperations ? JSON.parse(storedOperations) : [];
            const updatedOperations = parsedOperations.filter(op => op.id !== id);
            await AsyncStorage.setItem('cultivationOperations', JSON.stringify(updatedOperations));
            // Odśwież dane po usunięciu
            fetchData();
          } catch (error) {
            console.error("Błąd podczas usuwania zabiegu uprawowego:", error);
          }
        }
      }
    ]);
  };

  const handleFertilizationClick = (fertilization) => {
    setSelectedDetails({
      "Data": formatDate(fertilization.date),
      "Godzina": formatTime(fertilization.date),
      "Ilość": fertilization.quantity + " kg/ha",
      "Interwencja": fertilization.agrotechnicalIntervention,
      "Opis": fertilization.description || "Brak opisu",
    });
    setModalTitle("Szczegóły nawożenia");
    setModalVisible(true);
  };

  const handleDeleteFertilization = async (id) => {
    Alert.alert("Usuń nawożenie", "Czy na pewno chcesz usunąć to nawożenie?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          try {
            const storedFertilizations = await AsyncStorage.getItem('fertilizations');
            const parsedFertilizations = storedFertilizations ? JSON.parse(storedFertilizations) : [];
            const updatedFertilizations = parsedFertilizations.filter(f => f.id !== id);
            await AsyncStorage.setItem('fertilizations', JSON.stringify(updatedFertilizations));
            // Odśwież dane po usunięciu
            fetchData();
          } catch (error) {
            console.error("Błąd podczas usuwania nawożenia:", error);
          }
        }
      }
    ]);
  };

  const handlePlantProtectionClick = (protection) => {
    setSelectedDetails({
      "Data": formatDate(protection.date),
      "Godzina": formatTime(protection.date),
      "Ilość": protection.quantity + " kg/ha",
      "Interwencja": protection.agrotechnicalIntervention,
      "Opis": protection.description || "Brak opisu",
    });
    setModalTitle("Szczegóły ochrony roślin");
    setModalVisible(true);
  };

  const handleDeletePlantProtection = async (id) => {
    Alert.alert("Usuń ochronę roślin", "Czy na pewno chcesz usunąć tę ochronę roślin?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          try {
            const storedPlantProtections = await AsyncStorage.getItem('plantProtections');
            const parsedPlantProtections = storedPlantProtections ? JSON.parse(storedPlantProtections) : [];
            const updatedPlantProtections = parsedPlantProtections.filter(p => p.id !== id);
            await AsyncStorage.setItem('plantProtections', JSON.stringify(updatedPlantProtections));
            // Odśwież dane po usunięciu
            fetchData();
          } catch (error) {
            console.error("Błąd podczas usuwania ochrony roślin:", error);
          }
        }
      }
    ]);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <View style={styles.container}>
      <ExpandableComponent title={crop.name}>
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Pole:</Text>
          <Text style={styles.text}>{fieldName}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Gospodarstwo:</Text>
          <Text style={styles.text}>{farmName}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Typ uprawy:</Text>
          <Text style={styles.text}>{cropTypeName}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Aktywna:</Text>
          <Icon name={crop.isActive ? "check" : "close"} size={22} color={crop.isActive ? "#22734D" : "#FC7F7F"} />
        </View>
        <View style={styles.line} />

        <ExpandableComponent title="Zabiegi uprawowe" isExpanded={true} backgroundColor="#BAF1BA">
          {cultivationOperations.length > 0 ? (
            cultivationOperations.map(operation => (
              <View key={operation.id} style={styles.infoRowContainer}>
                <TouchableOpacity 
                  style={{ width: '70%' }}
                  onPress={() => handleCultivationOperationClick(operation)}
                >
                  <View style={styles.rowContainer}>
                    <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                    <Text style={styles.text}>{operation.name}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Edytuj Zabieg Uprawowy", { cropId: crop.id, operationId: operation.id })}>
                  <Icon name="edit" size={22} color="#00BFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteOperation(operation.id)}>
                  <Icon name="delete" size={22} color="#FC7F7F" />
                </TouchableOpacity> 
              </View>
            ))
          ) : (
            <Text style={[styles.text, { textAlign: 'center' }]}>Brak zabiegów dla tego pola</Text>
          )}
          <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
              onPress={() => navigation.navigate('Dodaj Zabieg Uprawowy', { cropId: crop.id })}
            >
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Dodaj Zabieg Uprawowy</Text>
            </TouchableOpacity>
          </View>
        </ExpandableComponent>

        <ExpandableComponent title="Nawożenie" isExpanded={false} backgroundColor="#BAF1BA">
          {fertilizations.length > 0 ? (
            fertilizations.map(fertilization => (
              <View key={fertilization.id} style={styles.infoRowContainer}>
                <TouchableOpacity 
                  style={{ width: '70%' }}
                  onPress={() => handleFertilizationClick(fertilization)}
                >
                  <View style={styles.rowContainer}>
                    <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                    <Text style={styles.text}>{fertilization.name || formatDate(fertilization.date)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Edytuj Nawożenie", { cropId: crop.id, fertilizationId: fertilization.id })}>
                  <Icon name="edit" size={22} color="#00BFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteFertilization(fertilization.id)}>
                  <Icon name="delete" size={22} color="#FC7F7F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.text, { textAlign: 'center' }]}>Brak historii nawożenia</Text>
          )}
          <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
              onPress={() => navigation.navigate('Dodaj Nawożenie', { cropId: crop.id })}
            >
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Dodaj Nawożenie</Text>
            </TouchableOpacity>
          </View>
        </ExpandableComponent>

        <ExpandableComponent title="Ochrona roślin" isExpanded={false} backgroundColor="#BAF1BA">
          {plantProtections.length > 0 ? (
            plantProtections.map(protection => (
              <View key={protection.id} style={styles.infoRowContainer}>
                <TouchableOpacity 
                  style={{ width: '70%' }}
                  onPress={() => handlePlantProtectionClick(protection)}
                >
                  <View style={styles.rowContainer}>
                    <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                    <Text style={styles.text}>{protection.name || formatDate(protection.date)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Edytuj Ochronę Roślin", { cropId: crop.id, plantProtectionId: protection.id })}>
                  <Icon name="edit" size={22} color="#00BFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePlantProtection(protection.id)}>
                  <Icon name="delete" size={22} color="#FC7F7F" />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={[styles.text, { textAlign: 'center' }]}>Brak historii ochrony roślin</Text>
          )}
          <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
              onPress={() => navigation.navigate('Dodaj Ochronę Roślin', { cropId: crop.id })}
            >
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Dodaj Ochronę Roślin</Text>
            </TouchableOpacity>
          </View>
        </ExpandableComponent>

        <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} 
            onPress={() => navigation.navigate('Edytuj Uprawę', { id: crop.id })}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Edytuj</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#FC7F7F', width: '40%' }]} 
            onPress={() => handleDeleteCrop(crop.id)}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </ExpandableComponent>
      <DetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        details={selectedDetails}
      />
    </View>
  );
};

export default CropDetails;
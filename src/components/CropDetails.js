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

const CropDetails = ({ crop, handleDeleteCrop, onEdit }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [fieldName, setFieldName] = useState("Ładowanie...");
  const [farmName, setFarmName] = useState("Ładowanie...");
  const [cropTypeName, setCropTypeName] = useState(cropTypeMapping[crop.type] || "Nieznany typ");
  const [cropIdentifier, setCropIdentifier] = useState('');
  const [fertilizations, setFertilizations] = useState([]);
  const [plantProtections, setPlantProtections] = useState([]);
  const [cultivationOperations, setCultivationOperations] = useState([]);
  const [fertilizationProducts, setFertilizationProducts] = useState([]);
  const [plantProtectionProducts, setPlantProtectionProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setFieldName(crop.fieldName || "Nieznane pole");
      setFarmName(crop.farmName || "Nieznane gospodarstwo");
      setCropTypeName(cropTypeMapping[crop.type] || "Nieznany typ");
      setCropIdentifier(crop.identifier || "Brak");

      const storedProducts = await AsyncStorage.getItem('fertilizationProducts');
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
      setFertilizationProducts(parsedProducts);

      const storedPlantProtectionProducts = await AsyncStorage.getItem('plantProtectionProducts');
      const parsedPlatnProtectionProducts = storedPlantProtectionProducts ? JSON.parse(storedPlantProtectionProducts) : [];
      setPlantProtectionProducts(parsedPlatnProtectionProducts);
  
      setFertilizations(crop.fertilizations ? [...crop.fertilizations] : []);
      setPlantProtections(crop.plantProtections ? [...crop.plantProtections] : []);
      setCultivationOperations(crop.cultivationOperations ? [...crop.cultivationOperations] : []);
  
    } catch (error) {
      console.error("Błąd podczas pobierania danych uprawy:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

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

  const handleFertilizationClick = (fertilization) => {
    const product = fertilizationProducts.find(p => p.id === fertilization.productId);
    setSelectedDetails({
      "Data": formatDate(fertilization.date),
      "Godzina": formatTime(fertilization.date),
      "Produkt": product ? product.productName : "Nieznany produkt",
      "Ilość": product ? `${product.quantityPerUnit} ${product.unit}` : "Brak danych",
      "Interwencja": fertilization.agrotechnicalIntervention,
      "Opis": fertilization.description || "Brak opisu",
    });
    setModalTitle("Szczegóły nawożenia");
    setModalVisible(true);
  };

  const handlePlantProtectionClick = (protection) => {
    const product = plantProtectionProducts.find(p => p.id === protection.productId);
    setSelectedDetails({
      "Data": formatDate(protection.date),
      "Godzina": formatTime(protection.date),
      "Produkt": product ? product.productName : "Nieznany produkt",
      "Ilość": product ? `${product.quantityPerUnit} ${product.unit}` : "Brak danych",
      "Interwencja": protection.agrotechnicalIntervention,
      "Opis": protection.description || "Brak opisu",
    });
    setModalTitle("Szczegóły ochrony roślin");
    setModalVisible(true);
  };

  const saveUpdatedCrop = async (updatedCrop) => {
    try {
      const storedFarms = await AsyncStorage.getItem('farms');
      if (!storedFarms) throw new Error("Brak zapisanych gospodarstw.");

      let farms = JSON.parse(storedFarms);
      let updated = false;

      for (const farm of farms) {
        for (const field of farm.fields) {
          const cropIndex = field.crops.findIndex(c => c.id === updatedCrop.id);
          if (cropIndex !== -1) {
            field.crops[cropIndex] = updatedCrop;
            updated = true;
            break;
          }
        }
      }

      if (!updated) throw new Error("Nie znaleziono uprawy do edycji.");

      await AsyncStorage.setItem('farms', JSON.stringify(farms));
      setCultivationOperations(updatedCrop.cultivationOperations || []);
      setFertilizations(updatedCrop.fertilizations || []);
      setPlantProtections(updatedCrop.plantProtections || []);
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian w uprawie:", error);
    }
  };

  const handleDeleteOperation = async (id) => {
    Alert.alert("Usuń zabieg uprawowy", "Czy na pewno chcesz usunąć ten zabieg?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          const updatedCrop = {
            ...crop,
            cultivationOperations: crop.cultivationOperations.filter(op => op.id !== id),
          };
          await saveUpdatedCrop(updatedCrop);
        }
      }
    ]);
  };

  const handleDeleteFertilization = async (id) => {
    Alert.alert("Usuń nawożenie", "Czy na pewno chcesz usunąć to nawożenie?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          const updatedCrop = {
            ...crop,
            fertilizations: crop.fertilizations.filter(f => f.id !== id),
          };
          await saveUpdatedCrop(updatedCrop);
        }
      }
    ]);
  };

  const handleDeletePlantProtection = async (id) => {
    Alert.alert("Usuń ochronę roślin", "Czy na pewno chcesz usunąć tę ochronę roślin?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        onPress: async () => {
          const updatedCrop = {
            ...crop,
            plantProtections: crop.plantProtections.filter(p => p.id !== id),
          };
          await saveUpdatedCrop(updatedCrop);
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
          <Text style={styles.text}>Oznaczenie:</Text>
          <Text style={styles.text}>{cropIdentifier}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoRowContainer}>
          <Text style={styles.text}>Aktywna:</Text>
          <Icon name={crop.isActive ? "check" : "close"} size={22} color={crop.isActive ? "#22734D" : "#FC7F7F"} />
        </View>
        <View style={styles.line} />

        <ExpandableComponent title="Zabiegi agrotechniczne" isExpanded={false} backgroundColor="#BAF1BA">
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
            onPress={() => onEdit()}
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
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Alert, ScrollView, View, ActivityIndicator, RefreshControl, Text } from "react-native";
import CropDetails from "../../components/CropDetails";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import ErrorView from "../../components/ErrorView";
import { styles } from '../../styles/AppStyles';
import SearchFilter from '../../components/SearchFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate } from '../../utils/DateUtils';

const CropManagementScreen = () => {
  const navigation = useNavigation();
  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCropsFromFarms = async () => {
    try {
      setLoading(true);
      const storedFarms = await AsyncStorage.getItem('farms');
      if (!storedFarms) throw new Error("Brak zapisanych gospodarstw.");

      const parsedFarms = JSON.parse(storedFarms);
      if (!Array.isArray(parsedFarms) || parsedFarms.length === 0) {
        throw new Error("Nie znaleziono gospodarstwa.");
      }

      let allCrops = [];
      parsedFarms.forEach(farm => {
        if (!farm.fields || !Array.isArray(farm.fields) || farm.fields.length === 0) return;

        farm.fields.forEach(field => {
          if (!field.crops || !Array.isArray(field.crops)) return;

          field.crops.forEach(crop => {
            allCrops.push({ 
              ...crop, 
              fieldName: field.name, 
              fieldId: field.id,
              farmName: farm.name,
              farmId: farm.id,
              cultivationOperations: crop.cultivationOperations || [],
              fertilizations: crop.fertilizations || [],
              plantProtections: crop.plantProtections || []
            });
          });
        });
      });

      setFarms(parsedFarms);
      setCrops(allCrops);
      setError(null);
    } catch (err) {
      console.error("Błąd pobierania upraw:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCropsFromFarms();
    }, [])
  );

  const handleDeleteCrop = async (cropId, fieldId, farmId) => {
    Alert.alert(
      "Potwierdzenie usunięcia",
      "Czy na pewno chcesz usunąć tę uprawę?",
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              const storedFarms = await AsyncStorage.getItem('farms');
              if (!storedFarms) throw new Error("Brak zapisanych gospodarstw.");

              let parsedFarms = JSON.parse(storedFarms);
              const farmIndex = parsedFarms.findIndex(f => f.id === farmId);
              if (farmIndex === -1) throw new Error(`Nie znaleziono gospodarstwa o ID: ${farmId}`);

              const fieldIndex = parsedFarms[farmIndex].fields.findIndex(f => f.id === fieldId);
              if (fieldIndex === -1) throw new Error(`Nie znaleziono pola o ID: ${fieldId}`);

              parsedFarms[farmIndex].fields[fieldIndex].crops = parsedFarms[farmIndex].fields[fieldIndex].crops.filter(crop => crop.id !== cropId);

              await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));
              fetchCropsFromFarms();
            } catch (err) {
              console.error("Błąd usuwania uprawy:", err);
              Alert.alert("Błąd", err.message || "Nie udało się usunąć uprawy.");
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCropsFromFarms();
    setRefreshing(false);
  };

  const filteredCrops = useMemo(() => {
    if (!searchQuery) return crops;
    return crops.filter(crop =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.farmName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [crops, searchQuery]);

  if (loading) {
    return (
      <View style={[styles.mainContainer, { backgroundColor: '#fff', height: '100%' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <ScrollView style={styles.mainContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ErrorView title="Błąd" message={`${error} lub przeciągnij w dół, aby odświeżyć.`} />
      </ScrollView>
    );
  }

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <SearchFilter searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      {filteredCrops.length === 0 ? (
        <ScrollView style={styles.mainCantainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <WarningView title="Brak upraw" message="Dodaj uprawy, klikając przycisk plusa lub spróbuj innego wyszukiwania." />
        </ScrollView>
      ) : (
        <ScrollView style={styles.mainContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {filteredCrops.map((crop) => (
            <CropDetails 
              crop={crop}
              key={crop.id}
              handleDeleteCrop={() => handleDeleteCrop(crop.id, crop.fieldId, crop.farmId)}
              onEdit={() => navigation.navigate('Edytuj Uprawę', { cropId: crop.id, fieldId: crop.fieldId, farmId: crop.farmId })}
            >
              <Text style={styles.sectionTitle}>Zabiegi uprawowe</Text>
              {crop.cultivationOperations.length > 0 ? (
                crop.cultivationOperations.map(op => (
                  <Text key={op.id}>{formatDate(op.date)} - {op.name}</Text>
                ))
              ) : (
                <Text>Brak zabiegów</Text>
              )}

              <Text style={styles.sectionTitle}>Nawożenie</Text>
              {crop.fertilizations.length > 0 ? (
                crop.fertilizations.map(fert => (
                  <Text key={fert.id}>{formatDate(fert.date)} - {fert.type}, {fert.quantity} kg/ha</Text>
                ))
              ) : (
                <Text>Brak nawożenia</Text>
              )}

              <Text style={styles.sectionTitle}>Ochrona roślin</Text>
              {crop.plantProtections.length > 0 ? (
                crop.plantProtections.map(prot => (
                  <Text key={prot.id}>{formatDate(prot.date)} - {prot.type}, {prot.quantity} kg/ha</Text>
                ))
              ) : (
                <Text>Brak ochrony roślin</Text>
              )}
            </CropDetails>
          ))}
        </ScrollView>
      )}
      <FloatingActionButton onPress={() => navigation.navigate('Dodaj Uprawę')} />
    </View>
  );
};

export default CropManagementScreen;
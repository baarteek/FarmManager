import React, { useState, useMemo, useEffect } from 'react';
import { Alert, ScrollView, View, ActivityIndicator, RefreshControl } from "react-native";
import CropDetails from "../../components/CropDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import ErrorView from "../../components/ErrorView";
import { styles } from '../../styles/AppStyles';
import SearchFilter from '../../components/SearchFilter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CropManagementScreen = () => {
  const navigation = useNavigation();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchActiveCrops = async () => {
    try {
      setLoading(true);
      const storedCrops = await AsyncStorage.getItem('crops');
      const parsedCrops = storedCrops ? JSON.parse(storedCrops) : [];
      setCrops(parsedCrops);
      setError(null);
    } catch (err) {
      console.error("Błąd pobierania upraw:", err);
      setError("Błąd pobierania upraw");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveCrops();
  }, []);

  const handleDeleteCrop = async (id) => {
    Alert.alert("Potwierdzenie usunięcia", "Czy na pewno chcesz usunąć tę uprawę?", [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: async () => {
          try {
            const storedCrops = await AsyncStorage.getItem('crops');
            const parsedCrops = storedCrops ? JSON.parse(storedCrops) : [];
            const updatedCrops = parsedCrops.filter(crop => crop.id !== id);
            await AsyncStorage.setItem('crops', JSON.stringify(updatedCrops));
            fetchActiveCrops();
          } catch (err) {
            console.error("Błąd usuwania uprawy:", err);
          }
        }
      }
    ], { cancelable: false });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchActiveCrops();
    setRefreshing(false);
  };

  const filteredCrops = useMemo(() => {
    if (!searchQuery) return crops;
    return crops.filter(crop =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              handleDeleteCrop={() => handleDeleteCrop(crop.id)}
              onEdit={() => navigation.navigate('Edytuj Uprawę', { id: crop.id })}
            />
          ))}
        </ScrollView>
      )}
      <FloatingActionButton onPress={() => navigation.navigate('Dodaj Uprawę')} />
    </View>
  );
};

export default CropManagementScreen;
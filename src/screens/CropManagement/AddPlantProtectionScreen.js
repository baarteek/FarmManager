import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductSelector from '../../components/ProductSelector';
import { checkStorage } from '../../utils/CheckStorage';

const AddPlantProtectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cropId } = route.params;
  
  checkStorage();

  const [date, setDate] = useState(new Date());
  const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('plantProtectionProducts');
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
      setProducts(parsedProducts);
    } catch (err) {
      console.error("Błąd podczas pobierania produktów:", err.message);
      Alert.alert("Błąd", "Nie udało się pobrać produktów.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const handleAddPlantProtection = async () => {
    if (!selectedProduct || !agrotechnicalIntervention) {
      Alert.alert("Błąd walidacji", "Wszystkie pola muszą być wypełnione, w tym wybór produktu.");
      return;
    }

    const newPlantProtection = {
      id: Date.now().toString(),
      date: date.toISOString(),
      agrotechnicalIntervention,
      description: description.trim(),
      productId: selectedProduct.id,
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
            if (!field.crops[cropIndex].plantProtections) {
              field.crops[cropIndex].plantProtections = [];
            }
            field.crops[cropIndex].plantProtections.push(newPlantProtection);
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
        "Nowa ochrona roślin została dodana.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.error('Błąd podczas dodawania ochrony roślin:', err.message);
      Alert.alert("Błąd", err.message || "Nie udało się dodać ochrony roślin. Spróbuj ponownie później.");
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
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Data ochrony roślin</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={{ alignSelf: 'center', marginVertical: '2%' }}
        />
      </View>

      <Text style={[styles.largeText, { textAlign: 'center' }]}>Interwencja agrotechniczna</Text>
      <AgrotechnicalInterventionList 
        selectedOption={agrotechnicalIntervention} 
        setSelectedOption={setAgrotechnicalIntervention} 
      />

      <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
      <TextInput
        style={styles.input}
        placeholder="Dodaj opis"
        value={description}
        onChangeText={setDescription}
      />

      <ProductSelector 
        products={products}
        selectedProduct={selectedProduct}
        onSelect={setSelectedProduct}
        onAdd={() => {
          navigation.navigate('Dodaj Produkt', { productType: 'plantProtection' });
        }}
        onEdit={(product) => {
          navigation.navigate('Edytuj Produkt', { product, productType: 'plantProtection' });
        }}
        onDelete={(product) => {
          Alert.alert(
            "Usuń produkt",
            `Czy na pewno chcesz usunąć produkt ${product.productName}?`,
            [
              { text: "Anuluj", style: "cancel" },
              { 
                text: "Usuń", 
                style: "destructive", 
                onPress: async () => {
                  try {
                    const updatedProducts = products.filter(p => p.id !== product.id);
                    await AsyncStorage.setItem('plantProtectionProducts', JSON.stringify(updatedProducts));
                    setProducts(updatedProducts);
                    if (selectedProduct && selectedProduct.id === product.id) {
                      setSelectedProduct(null);
                    }
                  } catch (error) {
                    Alert.alert("Błąd", "Nie udało się usunąć produktu.");
                  }
                } 
              },
            ]
          );
        }}
      />

      <TouchableOpacity 
        style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
        onPress={handleAddPlantProtection}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Dodaj ochronę roślin
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddPlantProtectionScreen;
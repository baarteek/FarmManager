import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/AppStyles';

const EditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product, productType } = route.params;

  const [productName, setProductName] = useState(product.productName);
  const [quantityPerUnit, setQuantityPerUnit] = useState(product.quantityPerUnit);
  const [unit, setUnit] = useState(product.unit || 'kg/ha');
  const [description, setDescription] = useState(product.description);
  const [loading, setLoading] = useState(false);

  const storageKey = productType === "plantProtection" ? "plantProtectionProducts" : "fertilizationProducts";

  const handleUpdateProduct = async () => {
    if (!productName.trim()) {
      Alert.alert("Błąd walidacji", "Nazwa produktu jest wymagana.");
      return;
    }

    setLoading(true);
    try {
      const storedProducts = await AsyncStorage.getItem(storageKey);
      let products = storedProducts ? JSON.parse(storedProducts) : [];
      
      const updatedProducts = products.map(p => {
        if (p.id === product.id) {
          return {
            ...p,
            productName: productName.trim(),
            quantityPerUnit: quantityPerUnit.trim(),
            unit,
            description: description.trim(),
          };
        }
        return p;
      });
      
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedProducts));

      Alert.alert(
        "Sukces",
        "Produkt został zaktualizowany.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      console.error('Błąd podczas aktualizacji produktu:', err.message);
      Alert.alert("Błąd", err.message || "Nie udało się zaktualizować produktu. Spróbuj ponownie później.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.mainCantainer}>
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Nazwa Produktu</Text>
      <TextInput
        style={styles.input}
        placeholder="Wprowadź nazwę produktu"
        value={productName}
        onChangeText={setProductName}
      />
      
      <Text style={[styles.largeText, { textAlign: 'center' }]}>Ilość</Text>
      <TextInput
        style={styles.input}
        placeholder="Wprowadź ilość"
        value={quantityPerUnit}
        onChangeText={setQuantityPerUnit}
        keyboardType="numeric"
      />

      <Text style={[styles.largeText, { textAlign: 'center' }]}>Jednostka</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: unit === 'kg/ha' ? '#62C962' : '#ccc',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          onPress={() => setUnit('kg/ha')}
        >
          <Text style={{ fontWeight: 'bold', color: unit === 'kg/ha' ? '#62C962' : '#000' }}>kg/ha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: unit === 'l/ha' ? '#62C962' : '#ccc',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          onPress={() => setUnit('l/ha')}
        >
          <Text style={{ fontWeight: 'bold', color: unit === 'l/ha' ? '#62C962' : '#000' }}>l/ha</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis produktu</Text>
      <TextInput
        style={styles.input}
        placeholder="Dodaj opis produktu"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity 
        style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
        onPress={handleUpdateProduct}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: '10%' }}>
            Zaktualizuj produkt
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProductScreen;

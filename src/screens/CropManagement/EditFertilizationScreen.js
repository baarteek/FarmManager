import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../styles/AppStyles';
import AgrotechnicalInterventionList from '../../components/AgrotechnicalInterventionList';
import ProductSelector from '../../components/ProductSelector';

const EditFertilizationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { cropId, fertilizationId } = route.params;

    const [date, setDate] = useState(new Date());
    const [agrotechnicalIntervention, setAgrotechnicalIntervention] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadProducts = async () => {
        try {
            const storedProducts = await AsyncStorage.getItem('fertilizationProducts');
            const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
            setProducts(parsedProducts);
        } catch (err) {
            console.error("Błąd podczas pobierania produktów:", err.message);
            Alert.alert("Błąd", "Nie udało się pobrać produktów.");
        }
    };

    useEffect(() => {
        const fetchFertilization = async () => {
            try {
                const storedFarms = await AsyncStorage.getItem('farms');
                if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");

                let farms = JSON.parse(storedFarms);
                let foundFertilization = null;

                for (const farm of farms) {
                    for (const field of farm.fields) {
                        for (const crop of field.crops) {
                            if (crop.id === cropId && crop.fertilizations) {
                                foundFertilization = crop.fertilizations.find(f => f.id === fertilizationId);
                                if (foundFertilization) break;
                            }
                        }
                    }
                }

                if (foundFertilization) {
                    setDate(new Date(foundFertilization.date));
                    setAgrotechnicalIntervention(foundFertilization.agrotechnicalIntervention);
                    setDescription(foundFertilization.description);

                    const storedProducts = await AsyncStorage.getItem('fertilizationProducts');
                    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
                    setProducts(parsedProducts);

                    const selectedProd = parsedProducts.find(p => p.id === foundFertilization.productId);
                    setSelectedProduct(selectedProd || null);
                } else {
                    Alert.alert("Błąd", "Nie znaleziono nawożenia.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error('Błąd podczas pobierania nawożenia:', error);
                Alert.alert("Błąd", "Nie udało się załadować danych nawożenia.");
                navigation.goBack();
            } finally {
                setInitialLoading(false);
            }
        };

        fetchFertilization();
    }, [cropId, fertilizationId, navigation]);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [])
    );

    const handleSave = async () => {
        if (!selectedProduct || !agrotechnicalIntervention) {
            Alert.alert('Błąd walidacji', 'Wszystkie pola muszą być wypełnione, w tym wybór produktu.');
            return;
        }

        setLoading(true);

        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (!storedFarms) throw new Error("Nie znaleziono gospodarstw.");

            let farms = JSON.parse(storedFarms);
            let updated = false;

            for (const farm of farms) {
                for (const field of farm.fields) {
                    for (const crop of field.crops) {
                        if (crop.id === cropId && crop.fertilizations) {
                            const fertilizationIndex = crop.fertilizations.findIndex(f => f.id === fertilizationId);
                            if (fertilizationIndex !== -1) {
                                crop.fertilizations[fertilizationIndex] = {
                                    ...crop.fertilizations[fertilizationIndex],
                                    date,
                                    agrotechnicalIntervention,
                                    description,
                                    productId: selectedProduct.id
                                };
                                updated = true;
                                break;
                            }
                        }
                    }
                }
            }

            if (!updated) {
                throw new Error("Nie znaleziono nawożenia do edycji.");
            }

            await AsyncStorage.setItem('farms', JSON.stringify(farms));

            Alert.alert("Sukces", "Dane nawożenia zostały zaktualizowane!", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Błąd podczas aktualizacji nawożenia:', error);
            Alert.alert('Błąd', error.message || 'Nie udało się zaktualizować danych nawożenia.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.mainCantainer}>
            <Text style={[styles.largeText, { textAlign: 'center' }]}>Data nawożenia</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => setDate(selectedDate || date)}
                    style={{ alignSelf: 'center', marginVertical: '2%' }}
                />
            </View>

            <Text style={[styles.largeText, { textAlign: 'center' }]}>Interwencja agrotechniczna</Text>
            <AgrotechnicalInterventionList selectedOption={agrotechnicalIntervention} setSelectedOption={setAgrotechnicalIntervention} />

            <Text style={[styles.largeText, { textAlign: 'center' }]}>Opis</Text>
            <TextInput style={styles.input} placeholder="Opis" value={description} onChangeText={setDescription} />

            <ProductSelector 
                products={products}
                selectedProduct={selectedProduct}
                onSelect={setSelectedProduct}
                onAdd={() => navigation.navigate('Dodaj Produkt Nawozenia')}
                onEdit={(product) => navigation.navigate('Edytuj Produkt Nawozenia', { product })}
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
                                        await AsyncStorage.setItem('fertilizationProducts', JSON.stringify(updatedProducts));
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
                onPress={handleSave}
                disabled={loading}
            >
                {loading ? <ActivityIndicator size="large" color="#fff" /> : (
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Zapisz zmiany
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditFertilizationScreen;
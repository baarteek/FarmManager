import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FieldDetails from "../../components/FieldDetails";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import { styles } from "../../styles/AppStyles";

const FieldManagementScreen = () => {
    const navigation = useNavigation();
    const [farms, setFarms] = useState([]);
    const [fields, setFields] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const loadFarms = async () => {
        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            if (storedFarms) {
                const parsedFarms = JSON.parse(storedFarms);
                setFarms(parsedFarms);
                if (parsedFarms.length > 0) {
                    setSelectedFarm(parsedFarms[0]);
                }
            } else {
                setFarms([]);
            }
        } catch (error) {
            console.error("Błąd podczas ładowania gospodarstw:", error);
            setError("Nie udało się załadować gospodarstw.");
        }
        setLoading(false);
    };

    const loadFields = async (farmId) => {
        try {
            const storedFields = await AsyncStorage.getItem('fields');
            if (storedFields) {
                const parsedFields = JSON.parse(storedFields);
                const filteredFields = parsedFields.filter(field => field.farmId === farmId);
                setFields(filteredFields);
            } else {
                setFields([]);
            }
        } catch (error) {
            console.error("Błąd podczas ładowania pól:", error);
            setError("Nie udało się załadować pól.");
        }
    };

    useEffect(() => {
        loadFarms();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (selectedFarm) {
                loadFields(selectedFarm.id);
            }
        }, [selectedFarm])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadFarms();
        if (selectedFarm) {
            await loadFields(selectedFarm.id);
        }
        setRefreshing(false);
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Potwierdzenie usunięcia",
            "Czy na pewno chcesz usunąć to pole?",
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Usuń',
                    onPress: async () => {
                        try {
                            const storedFields = await AsyncStorage.getItem('fields');
                            if (storedFields) {
                                let parsedFields = JSON.parse(storedFields);
                                parsedFields = parsedFields.filter(field => field.id !== id);
                                await AsyncStorage.setItem('fields', JSON.stringify(parsedFields));
                                loadFields(selectedFarm.id);
                            }
                        } catch (error) {
                            console.error("Błąd podczas usuwania pola:", error);
                        }
                    },
                    style: 'destructive'
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (farms.length === 0) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <WarningView 
                    title="Brak gospodarstw" 
                    message="Nie znaleziono żadnych gospodarstw. Dodaj nowe gospodarstwo, klikając przycisk poniżej."
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: '5%', marginHorizontal: '10%', backgroundColor: '#00E000' }]}
                    onPress={() => navigation.navigate('Dodaj Gospodarstwo')}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>
                        Dodaj gospodarstwo
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView horizontal style={{ paddingVertical: '3%', height: '5%' }}>
                {farms.map((farm) => (
                    <TouchableOpacity
                        key={farm.id}
                        style={{
                            paddingHorizontal: '3%',
                            paddingVertical: '3%',
                            backgroundColor: farm.id === selectedFarm?.id ? '#62C962' : '#e6ede9',
                            marginHorizontal: '3%',
                            borderRadius: 5,
                        }}
                        onPress={() => {
                            setSelectedFarm(farm);
                            loadFields(farm.id);
                        }}
                    >
                        <Text style={{ color: farm.id === selectedFarm?.id ? '#fff' : '#000', fontWeight: 'bold', fontSize: 16, paddingHorizontal: 10 }}>
                            {farm.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {fields.length === 0 ? (
                <ScrollView 
                    style={[styles.mainContainer, { height: '90%' }]} 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <WarningView title="Brak pól" message="Dodaj pola, klikając przycisk plusa." />
                </ScrollView>
            ) : (
                <ScrollView 
                    style={[styles.mainContainer, { height: '90%' }]} 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {fields.map((field) => (
                        <FieldDetails 
                            fieldData={field} 
                            key={field.id} 
                            onDelete={() => confirmDelete(field.id)}
                            onEdit={() => navigation.navigate('Edytuj Pole', { field })} 
                        />
                    ))}
                </ScrollView> 
            )}
            
            <FloatingActionButton 
                onPress={() => navigation.navigate('Dodaj Pole', { farmId: selectedFarm.id })}
            />
        </View>
    );
};

export default FieldManagementScreen;
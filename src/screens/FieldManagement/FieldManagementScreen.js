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

    useEffect(() => {
        loadFarms();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadFarms();
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await loadFarms();
        setRefreshing(false);
    };

    const confirmDelete = (fieldId) => {
        Alert.alert(
            "Potwierdzenie usunięcia",
            "Czy na pewno chcesz usunąć to pole?",
            [
                { text: 'Anuluj', style: 'cancel' },
                {
                    text: 'Usuń',
                    onPress: async () => {
                        try {
                            const storedFarms = await AsyncStorage.getItem('farms');
                            if (storedFarms) {
                                let parsedFarms = JSON.parse(storedFarms);

                                const farmIndex = parsedFarms.findIndex(f => f.id === selectedFarm.id);
                                if (farmIndex !== -1) {
                                    parsedFarms[farmIndex].fields = parsedFarms[farmIndex].fields.filter(field => field.id !== fieldId);
                                    await AsyncStorage.setItem('farms', JSON.stringify(parsedFarms));
                                    setSelectedFarm(parsedFarms[farmIndex]); // Aktualizuj wybrane gospodarstwo
                                }
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
                            marginHorizontal: '5%',
                            borderRadius: 5,
                        }}
                        onPress={() => setSelectedFarm(farm)}
                    >
                        <Text style={{ color: farm.id === selectedFarm?.id ? '#fff' : '#000', fontWeight: 'bold', fontSize: 16, paddingHorizontal: 10 }}>
                            {farm.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedFarm?.fields?.length === 0 ? (
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
                    {selectedFarm?.fields?.map((field) => (
                        <FieldDetails 
                            fieldData={field} 
                            key={field.id} 
                            onDelete={() => confirmDelete(field.id)}
                            onEdit={() => navigation.navigate('Edytuj Pole', { farmId: selectedFarm.id, field })} 
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
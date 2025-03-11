import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ScrollView, View, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FarmDetails from "../../components/FarmDetails";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import { styles } from '../../styles/AppStyles';

const FarmManagementScreen = () => {
    const navigation = useNavigation();
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadFarms = async () => {
        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem('farms');
            setFarms(storedFarms ? JSON.parse(storedFarms) : []);
        } catch (error) {
            console.error("Błąd podczas ładowania gospodarstw:", error);
        }
        setLoading(false);
    };

    const saveFarms = async (updatedFarms) => {
        try {
            await AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));
        } catch (error) {
            console.error("Błąd podczas zapisywania gospodarstw:", error);
        }
    };

    const confirmDeleteFarm = (id) => {
        Alert.alert(
            "Potwierdzenie usunięcia", 
            "Czy na pewno chcesz usunąć to gospodarstwo?",
            [
                { text: 'Anuluj', style: 'cancel' },
                { 
                    text: 'Usuń', 
                    onPress: async () => {
                        const updatedFarms = farms.filter(farm => farm.id !== id);
                        setFarms(updatedFarms);
                        await saveFarms(updatedFarms);
                    }, 
                    style: 'destructive' 
                },
            ],
            { cancelable: false }
        );
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadFarms();
        setRefreshing(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadFarms();
        }, [])
    );

    if (loading) {
        return (
            <View style={[styles.mainContainer, { backgroundColor: '#fff', height: '100%' }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
            {farms.length === 0 ? (
                <WarningView title="Brak gospodarstw" message="Dodaj gospodarstwo, klikając przycisk plusa." />
            ) : (
                <ScrollView
                    style={styles.mainContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {farms.map((farm) => (
                        <FarmDetails 
                            farmData={farm} 
                            key={farm.id} 
                            onDelete={() => confirmDeleteFarm(farm.id)}
                            onEdit={() => navigation.navigate('Edytuj Gospodarstwo', { id: farm.id })}
                        />
                    ))}
                </ScrollView>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('Dodaj Gospodarstwo')} />
        </View>
    );
};

export default FarmManagementScreen;
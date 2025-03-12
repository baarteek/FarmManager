import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import CropDetails from "../../components/CropDetails";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorView from '../../components/ErrorView';
import WarningView from '../../components/WarningView';

const CropDetailsScreen = ({ route }) => {
    const { cropId } = route.params;
    const navigation = useNavigation();
    const [crop, setCrop] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [farmId, setFarmId] = useState(null);
    const [fieldId, setFieldId] = useState(null);

    const fetchCropData = async () => {
        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem("farms");
            const farms = storedFarms ? JSON.parse(storedFarms) : [];

            let foundCrop = null;
            let foundFarmId = null;
            let foundFieldId = null;

            for (const farm of farms) {
                for (const field of farm.fields) {
                    const cropData = field.crops.find(c => c.id === cropId);
                    if (cropData) {
                        foundCrop = { 
                            ...cropData, 
                            fieldName: field.name, 
                            farmName: farm.name 
                        };
                        foundFarmId = farm.id;
                        foundFieldId = field.id;
                        break;
                    }
                }
                if (foundCrop) break;
            }

            if (!foundCrop) {
                setError("Crop not found");
                setCrop(null);
                setFarmId(null);
                setFieldId(null);
            } else {
                setCrop(foundCrop);
                setFarmId(foundFarmId);
                setFieldId(foundFieldId);
                setError(null);
            }
        } catch (err) {
            console.error("Error fetching crop data:", err);
            setError("Error fetching crop data");
        } finally {
            setLoading(false);
        }
    };

    // Pobieranie danych po załadowaniu ekranu
    useEffect(() => {
        fetchCropData();
    }, [cropId]);

    // Aktualizacja danych po powrocie do ekranu (np. po edycji)
    useFocusEffect(
        useCallback(() => {
            fetchCropData();
        }, [cropId])
    );

    // Odświeżanie ręczne
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCropData();
        setRefreshing(false);
    };

    const handleDeleteCrop = async (id) => {
        try {
            const storedFarms = await AsyncStorage.getItem("farms");
            let farms = storedFarms ? JSON.parse(storedFarms) : [];

            farms = farms.map(farm => {
                farm.fields = farm.fields.map(field => {
                    field.crops = field.crops.filter(crop => crop.id !== id);
                    return field;
                });
                return farm;
            });

            await AsyncStorage.setItem("farms", JSON.stringify(farms));
            navigation.goBack();
        } catch (err) {
            console.error("Error deleting crop:", err);
        }
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this crop?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteCrop(id),
                    style: 'destructive'
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator color="#00ff00" />
            </View>
        );
    }

    if (error) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ErrorView title="Error" message={`${error} or pull down to refresh.`} />
            </ScrollView>
        );
    }

    if (!crop) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <WarningView 
                    title="Crop not found" 
                    message="The crop you are looking for does not exist. Please try again later." 
                />
            </ScrollView>
        );
    }

    return (
        <View style={[styles.mainContainer, { backgroundColor: '#fff' }]}>
            <ScrollView
                style={[styles.mainContainer, { height: '90%' }]}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <CropDetails 
                    crop={crop}  
                    handleDeleteCrop={() => confirmDelete(crop.id)}
                    onEdit={() => navigation.navigate('Edytuj Uprawę', { farmId, fieldId, cropId })}
                />
            </ScrollView>
        </View>
    );
};

export default CropDetailsScreen;
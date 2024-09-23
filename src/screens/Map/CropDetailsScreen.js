import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import CropDetails from "../../components/CropDetails";
import { useCropContext } from '../../context/CropProvider';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import ErrorView from '../../components/ErrorView';
import WarningView from '../../components/WarningView';

const CropDetailsScreen = ({ route }) => {
    const { cropId } = route.params;
    const navigation = useNavigation();
    const { fetchCropById, handleDeleteCrop, error: cropError } = useCropContext();
    const [crop, setCrop] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCropData = async () => {
        setLoading(true);
        try {
            const cropData = await fetchCropById(cropId);
            setCrop(cropData);
            setError(null);
        } catch (err) {
            setError('Error fetching crop data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCropData();
    }, [cropId]);

    useFocusEffect(
        useCallback(() => {
            fetchCropData();
        }, [cropId])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCropData();
        setRefreshing(false);
    };

    const confirmDelete = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this crop?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        handleDeleteCrop(id);
                        navigation.goBack();
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

    if (error) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <ErrorView title="Error" message={`${error} or pull down to refresh.`} />
            </ScrollView>
        );
    }

    if (!crop) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <WarningView 
                    title="Crop not found" 
                    message="The crop you are looking for does not exist. Please try again later." 
                />
            </ScrollView>
        );
    }

    return (
        <View style={[styles.mainContainer, {backgroundColor: '#fff'}]}>
            <ScrollView
                style={[styles.mainContainer, { height: '90%' }]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <CropDetails 
                    crop={crop} 
                    onDelete={() => confirmDelete(crop.id)}
                    onEdit={() => navigation.navigate('Edit Crop', { crop })}
                />
            </ScrollView>
        </View>
    );
};

export default CropDetailsScreen;

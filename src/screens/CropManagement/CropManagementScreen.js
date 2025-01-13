import React, { useState, useMemo } from 'react';
import { Alert, ScrollView, View, ActivityIndicator, RefreshControl } from "react-native";
import CropDetails from "../../components/CropDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import ErrorView from "../../components/ErrorView";
import { useCropContext } from '../../context/CropProvider';
import { styles } from '../../styles/AppStyles';

import SearchFilter from '../../components/SearchFilter';

const CropManagementScreen = () => {
    const navigation = useNavigation();
    const { crops, loading, handleDeleteCrop, fetchActiveCrops, error } = useCropContext();
    const [refreshing, setRefreshing] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const confirmDeleteCrop = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this crop?",
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

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchActiveCrops();
        setRefreshing(false);
    };


    const filteredCrops = useMemo(() => {
        if (!searchQuery) {
            return crops;
        }
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

    return (
        <View style={[{ width: '100%', height: '100%', backgroundColor: '#fff' }]}>
            {/* Pasek wyszukiwania */}
            <SearchFilter 
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
            />

            {filteredCrops.length === 0 ? (
                <ScrollView 
                    style={styles.mainCantainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <WarningView
                        title="No crops available"
                        message="Please add crops by clicking the plus button or try a different search"
                    />
                </ScrollView>
            ) : (
                <ScrollView
                    style={styles.mainContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {filteredCrops.map((crop) => (
                        <CropDetails 
                            crop={crop}
                            key={crop.id}
                            handleDeleteCrop={() => confirmDeleteCrop(crop.id)}
                            onEdit={() => navigation.navigate('Edit Crop', { id: crop.id })}
                        />
                    ))}
                </ScrollView>
            )}

            <FloatingActionButton onPress={() => navigation.navigate('Add Crop')} />
        </View>
    );
};

export default CropManagementScreen;
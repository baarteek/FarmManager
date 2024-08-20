import React, { useState } from 'react';
import { Alert, ScrollView, View, ActivityIndicator, RefreshControl } from "react-native";
import FarmDetails from "../../components/FarmDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import ErrorView from "../../components/ErrorView";
import { useFarmContext } from '../../context/FarmProvider';
import { styles } from '../../styles/AppStyles';

const FarmManagementScreen = () => {
    const navigation = useNavigation();
    const { farms, loading, handleDeleteFarm, fetchFarms, error } = useFarmContext();
    const [refreshing, setRefreshing] = useState(false);

    const confirmDeleteFarm = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this farm?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteFarm(id),
                    style: 'destructive'
                },
            ],
            { cancelable: false }
        );
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFarms();
        setRefreshing(false);
    };

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
            {farms.length === 0 ? (
                <WarningView title="No farms available" message="Please add farms by clicking the plus button" />
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
                            onEdit={() => navigation.navigate('Edit Farm', { id: farm.id })}
                        />
                    ))}
                </ScrollView>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('Add Farm')} />
        </View>
    );
};

export default FarmManagementScreen;

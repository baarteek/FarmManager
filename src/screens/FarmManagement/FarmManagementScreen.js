import React from 'react';
import { Alert, ScrollView, View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import FarmDetails from "../../components/FarmDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import { useFarmContext } from '../../context/FarmProvider';
import { styles } from '../../styles/AppStyles';

const FarmManagementScreen = () => {
    const navigation = useNavigation();
    const { farms, loading, handleDeleteFarm } = useFarmContext();

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

    if (loading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <View style={[{ width: '100%', height: '100%', backgroundColor: '#fff' }]}>
            {farms.length === 0 ? (
                <WarningView title="No farms available" message="Please add farms by clicking the plus button" />
            ) : (
                <ScrollView style={styles.mainContainer}>
                    {farms.map((farm) => (
                        <FarmDetails 
                            farmData={farm} 
                            key={farm.id} 
                            onDelete={() => confirmDeleteFarm(farm.id)}
                            onEdit={() => navigation.navigate('Edit Farm', { farm })}
                        />
                    ))}
                </ScrollView>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('Add Farm')} />
        </View>
    );
};

export default FarmManagementScreen;

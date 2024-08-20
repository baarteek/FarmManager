import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { styles } from "../../styles/AppStyles";
import FieldDetails from "../../components/FieldDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import { useFieldContext } from '../../context/FieldProvider';
import { useFarmContext } from '../../context/FarmProvider';
import ErrorView from '../../components/ErrorView';

const FieldManagementScreen = () => {
    const navigation = useNavigation();
    const { fields, handleDelete, fetchFields, error: fieldsError } = useFieldContext();
    const { farms, loading: farmsLoading, error: farmsError, fetchFarms } = useFarmContext();
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (farmsError) {
            setError(farmsError);
        }
    }, [farmsError]);

    useEffect(() => {
        if (fieldsError) {
            setError(fieldsError);
        }
    }, [fieldsError]);

    useEffect(() => {
        if (farms.length > 0) {
            setSelectedFarm(farms[0]);
        }
    }, [farms]);

    useEffect(() => {
        if (selectedFarm) {
            fetchFields(selectedFarm.id);
        }
    }, [selectedFarm]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFarms(); 
        if (farms.length > 0) {
            const firstFarm = farms[0];
            setSelectedFarm(firstFarm);
            await fetchFields(firstFarm.id);
        }
        setRefreshing(false);
    };

    const confirmDelete = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this field?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => handleDelete(id),
                    style: 'destructive'
                },
            ],
            { cancelable: false }
        );
    };

    if (farmsLoading || !selectedFarm) {
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

    if(farms.length === 0) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <WarningView 
                    title="No Farms Available" 
                    message="There are no farms available. Please add a new farm by clicking the button below or pull down to refresh." 
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: '5%', marginHorizontal: '10%', backgroundColor: '#00E000' }]}
                    onPress={() => navigation.navigate('Add Farm')}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: '10%' }}>Add Farm</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    

    return (
        <View style={styles.mainCantainer}>
            <ScrollView 
                horizontal 
                style={{ paddingVertical: '3%', height: '5%'}}
            >
                {farms.map((farm) => (
                    <TouchableOpacity
                        key={farm.id}
                        style={{
                            paddingHorizontal: '3%',
                            paddingVertical: '3%',
                            backgroundColor: farm.id === selectedFarm.id ? '#62C962' : '#e6ede9',
                            marginHorizontal: '3%',
                            borderRadius: 5,
                        }}
                        onPress={() => setSelectedFarm(farm)}
                    >
                        <Text style={{ color: farm.id === selectedFarm.id ? '#fff' : '#000', fontWeight: 'bold', fontSize: 16, width: '100%', paddingHorizontal: 10 }}>
                            {farm.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            {fields.length === 0 ? (
                <ScrollView style={[styles.mainContainer, {height: '90%'}]}  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    <WarningView title="No fields available" message="Please add fields by clicking the plus button" />
                </ScrollView>
            ) : (
                <ScrollView style={[styles.mainContainer, {height: '90%'}]}  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {fields.map((field) => (
                        <FieldDetails 
                            fieldData={field} 
                            key={field.id} 
                            onDelete={() => confirmDelete(field.id)}
                            onEdit={() => navigation.navigate('Edit Field', { field })}
                        />
                    ))}
                </ScrollView>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('Add Field')} />
        </View>
    );
};

export default FieldManagementScreen;

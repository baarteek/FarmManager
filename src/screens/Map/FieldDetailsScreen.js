import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import FieldDetails from "../../components/FieldDetails";
import { useFieldContext } from '../../context/FieldProvider';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ErrorView from '../../components/ErrorView';
import WarningView from '../../components/WarningView';

const FieldDetailsScreen = ({ route }) => {
    const { fieldId } = route.params;
    const navigation = useNavigation();
    const { fetchFieldById, handleDelete, error: fieldsError } = useFieldContext();
    const [field, setField] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchFieldData();
    }, [fieldId]);

    const fetchFieldData = async () => {
        setLoading(true);
        try {
            const fieldData = await fetchFieldById(fieldId);
            setField(fieldData);
            setError(null);
        } catch (err) {
            setError('Error fetching field data');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchFieldData();
        }, [fieldId])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchFieldData();
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
                    onPress: () => {
                        handleDelete(id);
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

    if (!field) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <WarningView 
                    title="Field not found" 
                    message="The field you are looking for does not exist. Please try again later." 
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
                <FieldDetails 
                    fieldData={field} 
                    onDelete={() => confirmDelete(field.id)}
                    onEdit={() => navigation.navigate('Edit Field', { field })}
                />
            </ScrollView>
        </View>
    );
};

export default FieldDetailsScreen;

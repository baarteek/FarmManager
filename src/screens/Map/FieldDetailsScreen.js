import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, ActivityIndicator, RefreshControl, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import FieldDetails from "../../components/FieldDetails";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorView from '../../components/ErrorView';
import WarningView from '../../components/WarningView';

const FieldDetailsScreen = ({ route }) => {
    const { fieldId } = route.params;
    const navigation = useNavigation();
    const [field, setField] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [farmId, setFarmId] = useState(null);

    const fetchFieldData = async () => {
        setLoading(true);
        try {
            const storedFarms = await AsyncStorage.getItem("farms");
            const farms = storedFarms ? JSON.parse(storedFarms) : [];

            let foundField = null;
            let foundFarmId = null;

            for (const farm of farms) {
                const fieldData = farm.fields.find(f => f.id === fieldId);
                if (fieldData) {
                    foundField = { ...fieldData, farmName: farm.name };
                    foundFarmId = farm.id;
                    break;
                }
            }

            if (!foundField) {
                setError("Field not found");
                setField(null);
                setFarmId(null);
            } else {
                setField(foundField);
                setFarmId(foundFarmId);
                setError(null);
            }
        } catch (err) {
            console.error("Error fetching field data:", err);
            setError("Error fetching field data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFieldData();
    }, [fieldId]);

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

    const handleDeleteField = async (id) => {
        try {
            const storedFarms = await AsyncStorage.getItem("farms");
            let farms = storedFarms ? JSON.parse(storedFarms) : [];

            farms = farms.map(farm => {
                farm.fields = farm.fields.filter(field => field.id !== id);
                return farm;
            });

            await AsyncStorage.setItem("farms", JSON.stringify(farms));
            navigation.goBack();
        } catch (err) {
            console.error("Error deleting field:", err);
        }
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this field?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => handleDeleteField(id),
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
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <ErrorView title="Error" message={`${error} or pull down to refresh.`} />
            </ScrollView>
        );
    }

    if (!field) {
        return (
            <ScrollView
                style={styles.mainContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <WarningView 
                    title="Field not found" 
                    message="The field you are looking for does not exist. Please try again later." 
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
                <FieldDetails 
                    fieldData={field} 
                    onDelete={() => confirmDelete(field.id)}
                    onEdit={() => navigation.navigate('Edytuj Pole', { farmId, field })}
                />
            </ScrollView>
        </View>
    );
};

export default FieldDetailsScreen;
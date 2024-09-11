import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const PlantProtectionTypePicker = ({ selectedPlantProtectionType, setSelectedPlantProtectionType }) => {
    const [plantProtectionTypes, setPlantProtectionTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchPlantProtectionTypes();
    }, []);

    const fetchPlantProtectionTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/PlantProtections/plantProtectionType`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPlantProtectionTypes(response.data);
            setSelectedPlantProtectionType(response.data[0]?.id);
        } catch (error) {
            console.error("Error fetching plant protection types:", error);
            setError("Failed to load plant protection types. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>;
    }

    return (
        <View>
            <Picker
                selectedValue={selectedPlantProtectionType}
                onValueChange={(itemValue) => setSelectedPlantProtectionType(itemValue)}
            >
                {plantProtectionTypes.map(plantProtectionType => (
                    <Picker.Item key={plantProtectionType.id} label={plantProtectionType.name} value={plantProtectionType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default PlantProtectionTypePicker;
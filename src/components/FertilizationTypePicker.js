import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const FertilizationTypePicker = ({ selectedFertilizationType, setSelectedFertilizationType }) => {
    const [fertilizationTypes, setFertilizationTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchFertilizationTypes();
    }, []);

    const fetchFertilizationTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Fertilizations/fertilizationType`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setFertilizationTypes(response.data);
            setSelectedFertilizationType(response.data[0]?.id);
        } catch (error) {
            console.error("Error fetching fertilization types:", error);
            setError("Failed to load fertilization types. Please try again later.");
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
                selectedValue={selectedFertilizationType}
                onValueChange={(itemValue) => setSelectedFertilizationType(itemValue)}
            >
                {fertilizationTypes.map(fertilizationType => (
                    <Picker.Item key={fertilizationType.id} label={fertilizationType.name} value={fertilizationType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default FertilizationTypePicker;
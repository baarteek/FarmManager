import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const SoilTypePicker = ({ selectedSoilType, setSelectedSoilType }) => {
    const [soilTypes, setSoilTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchSoilTypes();
    }, []);

    const fetchSoilTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Fields/soil-type`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });
            setSoilTypes(response.data);
            setSelectedSoilType(response.data[0]?.id);
        } catch (error) {
            console.error("Error fetching soil types:", error);
            setError("Failed to load soil types. Please try again later.");
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
                selectedValue={selectedSoilType}
                onValueChange={(itemValue) => setSelectedSoilType(itemValue)}
            >
                {soilTypes.map(soilType => (
                    <Picker.Item key={soilType.id} label={soilType.name} value={soilType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default SoilTypePicker;

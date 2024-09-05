import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const CropTypePicker = ({ selectedCropType, setSelectedCropType }) => {
    const [cropTypes, setCropTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        fetchCropTypes();
    }, []);

    const fetchCropTypes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Crops/cropType`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCropTypes(response.data);
            setSelectedCropType(response.data[0]?.id);
        } catch (error) {
            console.error("Error fetching crop types:", error);
            setError("Failed to load crop types. Please try again later.");
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
                selectedValue={selectedCropType}
                onValueChange={(itemValue) => setSelectedCropType(itemValue)}
            >
                {cropTypes.map(cropType => (
                    <Picker.Item key={cropType.id} label={cropType.name} value={cropType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default CropTypePicker;

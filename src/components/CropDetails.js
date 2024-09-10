import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { formatDate } from '../utils/DateUtils';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';
import { useFertilizationContext } from '../context/FertilizationProvider';

const CropDetails = ({ crop, handleDeleteCrop }) => {
    const navigation = useNavigation();
    const { token } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [cropTypes, setCropTypes] = useState([]);
    const [fertilizationTypes, setFertilizationTypes] = useState([]); // State for fertilization types
    const [loadingCropTypes, setLoadingCropTypes] = useState(true);
    const [cropTypeName, setCropTypeName] = useState('');
    const [fertilizations, setFertilizations] = useState(crop.fertilizations || []);
    const { fetchFertilizationById, deleteFertilization } = useFertilizationContext();


    useEffect(() => {
        const fetchCropTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Crops/cropType`, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });
                setCropTypes(response.data);
            } catch (error) {
                console.error("Error fetching crop types:", error);
            } finally {
                setLoadingCropTypes(false);
            }
        };

        const fetchFertilizationTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Fertilizations/fertilizationType`, { 
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });
                setFertilizationTypes(response.data);
            } catch (error) {
                console.error("Error fetching fertilization types:", error);
            }
        };

        fetchCropTypes();
        fetchFertilizationTypes();
    }, [token]);

    useEffect(() => {
        if (cropTypes.length > 0) {
            const type = cropTypes.find((type) => type.id === crop.type);
            setCropTypeName(type ? type.name : 'Unknown Type');
        }
    }, [cropTypes, crop.type]);

    const getFertilizationTypeName = (typeId) => {
        const type = fertilizationTypes.find((type) => type.id === typeId);
        return type ? type.name : 'Unknown Type';
    };

    const handleFertilizationClick = async (id) => {
        const fertilization = await fetchFertilizationById(id);

        const details = {
            Date: formatDate(fertilization.date),
            Type: getFertilizationTypeName(fertilization.type),
            Quantity: `${fertilization.quantity} kg`,
            Method: fertilization.method,
            Description: fertilization.description
        };
        
        setSelectedDetails(details);
        setModalTitle('Fertilization Details');
        setModalVisible(true);
    };

    const handlePestAndDiseaseClick = (history) => {
        const details = {
            Date: formatDate(history.date),
            Type: history.type,
            Treatment: history.treatment,
            Description: history.description
        };

        setSelectedDetails(details);
        setModalTitle('Pest and Disease Details');
        setModalVisible(true);
    };

    const handleDeleteFertilization = (id) => {
        Alert.alert(
            "Delete Fertilization",
            "Are you sure you want to delete this Fertilization?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: async () =>  {
                    try {
                        await deleteFertilization(id);
                        setFertilizations(fertilizations.filter(f => f.id !== id));
                    } catch (error) {
                        console.error("Error deleting fertilization:", error);
                    }
                }},
            ],
            { cancelable: false }
        );
    };

    if (loadingCropTypes) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    return (
        <View style={styles.container}>
            <ExpandableComponent title={crop.name}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Field:</Text>
                    <Text style={styles.text}>{crop.field.name}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Crop Type:</Text>
                    <Text style={styles.text}>{cropTypeName}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Is Active</Text>
                    <View>
                        {crop.isActive ? (
                            <Icon name="check" size={22} color="#22734D" style={{ marginRight: '10%', textShadowColor: '#22734D', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 1 }} />
                        ) : (
                            <Icon name="close" size={22} color="#FC7F7F" style={{ marginRight: '10%', textShadowColor: '#22734D', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 1 }} />
                        )}
                    </View>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Sowing Date:</Text>
                    <Text style={styles.text}>{formatDate(crop.sowingDate)}</Text>  
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Harvest Date:</Text>
                    <Text style={styles.text}>{formatDate(crop.harvestDate)}</Text> 
                </View>
                <View style={styles.line} />
                
                <ExpandableComponent title="Fertilization" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {fertilizations && fertilizations.length > 0 ? (
                        fertilizations.map((fertilization, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.infoRowContainer}>
                                    <TouchableOpacity 
                                        style={{ width: '70%' }} 
                                        onPress={() => handleFertilizationClick(fertilization.id)}
                                    >
                                        <View style={styles.rowContainer}>
                                            <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                            <Text style={styles.text}>{fertilization.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Edit Fertilization', { fieldId: crop.fieldId, cropId: crop.id, fertilizationIndex: index })}>
                                        <Icon name="edit" size={22} color="#00BFFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteFertilization(fertilization.id)}>
                                        <Icon name="delete" size={22} color="#FC7F7F" />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <Text style={[styles.text, { textAlign: 'center' }]}>No fertilization history available</Text>
                    )}
                    <View style={[styles.rowContainer, { justifyContent: 'space-around', marginVertical: '5%' }]}>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
                            onPress={() => navigation.navigate('Add Fertilization', { cropId: crop.id })}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Add Fertilization</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>

                <ExpandableComponent title="Pest and Disease" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {crop.plantProtections && crop.plantProtections.length > 0 ? (
                        crop.plantProtections.map((plantProtection, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.infoRowContainer}>
                                    <TouchableOpacity 
                                        style={{ width: '70%' }} 
                                        onPress={() => handlePestAndDiseaseClick(plantProtection)}
                                    >
                                        <View style={styles.rowContainer}>
                                            <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                            <Text style={styles.text}>{plantProtection.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Edit Pest or Disease', { fieldId: crop.fieldId, cropId: crop.id, historyIndex: index })}>
                                        <Icon name="edit" size={22} color="#00BFFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteItem(plantProtection.id, 'Pest or Disease')}>
                                        <Icon name="delete" size={22} color="#FC7F7F" />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <Text style={[styles.text, { textAlign: 'center' }]}>No pest and disease history available</Text>
                    )}
                    <View style={[styles.rowContainer, { justifyContent: 'space-around', marginVertical: '5%' }]}>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
                            onPress={() => {}}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Add Pest or Disease</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>

                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} 
                        onPress={() => navigation.navigate('Edit Crop', { id: crop.id})}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Edit Crop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#FC7F7F', width: '40%' }]} 
                        onPress={() => handleDeleteCrop(crop.id)}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Delete Crop</Text>
                    </TouchableOpacity>
                </View>

                <DetailsModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title={modalTitle}
                    details={selectedDetails}
                />
            </ExpandableComponent>
        </View>
    );
};

export default CropDetails;

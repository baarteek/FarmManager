import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { formatDate, formatTime } from '../utils/DateUtils';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/apiConfig';
import { useFertilizationContext } from '../context/FertilizationProvider';
import { usePlantProtectionContext } from '../context/PlantProtectionProvider'; 
import { useCultivationOperationContext } from '../context/CultivationOperationProvider';

const CropDetails = ({ crop, handleDeleteCrop }) => {
    const navigation = useNavigation();
    const { token } = useAuth();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [cropTypes, setCropTypes] = useState([]);
    const [fertilizationTypes, setFertilizationTypes] = useState([]);
    const [plantProtectionTypes, setPlantProtectionTypes] = useState([]);
    const [loadingCropTypes, setLoadingCropTypes] = useState(true);
    const [cropTypeName, setCropTypeName] = useState('');
    const [fertilizations, setFertilizations] = useState(crop.fertilizations || []);
    const [plantProtections, setPlantProtections] = useState(crop.plantProtections || []); 
    const [ cultivationOperations, setCultivationOperations] = useState(crop.cultivationOperations || []);

    const { fetchFertilizationById, deleteFertilization } = useFertilizationContext();
    const { fetchPlantProtectionById, deletePlantProtection } = usePlantProtectionContext();
    const { fetchCultivationOperationById, deleteCultivationOperation } = useCultivationOperationContext();

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

        const fetchPlantProtectionTypes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/PlantProtections/plantProtectionType`, { 
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });
                setPlantProtectionTypes(response.data);
            } catch (error) {
                console.error("Error fetching plant protection types:", error);
            }
        };

        fetchCropTypes();
        fetchFertilizationTypes();
        fetchPlantProtectionTypes();
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

    const getPlantProtectionTypeName = (typeId) => {
        const type = plantProtectionTypes.find((type) => type.id === typeId);
        return type ? type.name : 'Unknown Type';
    };

    const handleFertilizationClick = async (id) => {
        const fertilization = await fetchFertilizationById(id);

        const details = {
            Date: formatDate(fertilization.date),
            Time: formatTime(fertilization.date),
            Type: getFertilizationTypeName(fertilization.type),
            Quantity: `${fertilization.quantity} kg`,
            Method: fertilization.method,
            Description: fertilization.description
        };
        
        setSelectedDetails(details);
        setModalTitle('Fertilization Details');
        setModalVisible(true);
    };

    const handleCultivateOperationClick = async (id) => {
        const operation = await fetchCultivationOperationById(id);

        const details = {
            Name: operation.name,
            Date: formatDate(operation.date),
            Description: operation.description,
        }

        setSelectedDetails(details);
        setModalTitle('Cultivation Operation Details');
        setModalVisible(true);
    };

    const handlePlantProtectionClick = async (id) => {
        const plantProtection = await fetchPlantProtectionById(id);

        const details = {
            Date: formatDate(plantProtection.date),
            Type: getPlantProtectionTypeName(plantProtection.type),
            Quantity: `${plantProtection.quantity} kg`,
            Method: plantProtection.method,
            Description: plantProtection.description
        };
        
        setSelectedDetails(details);
        setModalTitle('Plant Protection Details');
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

    const handleCultivationOperationDelete = async (id) => {
        Alert.alert(
            "Delete Fertilization",
            "Are you sure you want to delete this Cultivation Operation?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: async () =>  {
                    try {
                        await deleteCultivationOperation(id);
                        setCultivationOperations(cultivationOperations.filter(co => co.id !== id));
                    } catch (error) {
                        console.error("Error deleting fertilization:", error);
                    }
                }},
            ],
            { cancelable: false }
        );
    };

    const handleDeletePlantProtection = (id) => {
        Alert.alert(
            "Delete Plant Protection",
            "Are you sure you want to delete this Plant Protection?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: async () =>  {
                    try {
                        await deletePlantProtection(id);
                        setPlantProtections(plantProtections.filter(p => p.id !== id));
                    } catch (error) {
                        console.error("Error deleting plant protection:", error);
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

                <ExpandableComponent title="Cultivation Operation" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {cultivationOperations && cultivationOperations.length > 0 ? (
                        cultivationOperations.map((operation, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.infoRowContainer}>
                                    <TouchableOpacity 
                                        style={{ width: '70%' }} 
                                        onPress={() => handleCultivateOperationClick(operation.id)}
                                    >
                                        <View style={styles.rowContainer}>
                                            <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                            <Text style={styles.text}>{operation.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Edit Cultivation Operation', { cropId: crop.id, operationId: operation.id })}>
                                        <Icon name="edit" size={22} color="#00BFFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleCultivationOperationDelete(operation.id)}>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('Edit Fertilization', { cropId: crop.id, fertilizationId: fertilization.id })}>
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
                {plantProtections && plantProtections.length > 0 ? (
                    plantProtections.map((plantProtection, index) => (
                        <React.Fragment key={index}>
                            <View style={styles.infoRowContainer}>
                                <TouchableOpacity 
                                    style={{ width: '70%' }} 
                                    onPress={() => handlePlantProtectionClick(plantProtection.id)}
                                >
                                    <View style={styles.rowContainer}>
                                        <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                        <Text style={styles.text}>{plantProtection.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Edit Plant Protection', { cropId: crop.id, plantProtectionId: plantProtection.id})}>
                                    <Icon name="edit" size={22} color="#00BFFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeletePlantProtection(plantProtection.id)}>
                                    <Icon name="delete" size={22} color="#FC7F7F" />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                        </React.Fragment>
                    ))
                ) : (
                    <Text style={[styles.text, { textAlign: 'center' }]}>No plant protection history available</Text>
                )}
                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginVertical: '5%' }]}>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
                        onPress={() => navigation.navigate('Add Plant Protection', { cropId: crop.id })}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Add Plant Protection</Text>
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

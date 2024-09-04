import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { formatDate } from '../utils/DateUtils';

const CropDetails = ({ crop, handleDeleteCrop }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    const handleFertilizationClick = (fertilization) => {
        const details = {
            Date: formatDate(fertilization.date),
            Type: fertilization.type,
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

    const handleDeleteItem = (id, type) => {
        Alert.alert(
            `Delete ${type}`,
            `Are you sure you want to delete this ${type.toLowerCase()}?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => handleDeleteCrop(id) },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <ExpandableComponent title={crop.name}>
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
                    {crop.fertilizations && crop.fertilizations.length > 0 ? (
                        crop.fertilizations.map((fertilization, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.infoRowContainer}>
                                    <TouchableOpacity 
                                        style={{ width: '70%' }} 
                                        onPress={() => handleFertilizationClick(fertilization)}
                                    >
                                        <View style={styles.rowContainer}>
                                            <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                            <Text style={styles.text}>{fertilization.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Edit Fertilization', { fieldId: crop.fieldId, cropId: crop.id, fertilizationIndex: index })}>
                                        <Icon name="edit" size={22} color="#00BFFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteItem(fertilization.id, 'Fertilization')}>
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
                            onPress={() => navigation.navigate('Add Fertilization', { fieldId: crop.fieldId, cropId: crop.id })}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Add</Text>
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
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>

                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} 
                        onPress={() => navigation.navigate('Edit Crop', { fieldId: crop.fieldId, cropId: crop.id })}
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

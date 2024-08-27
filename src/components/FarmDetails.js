import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import ExpandableComponent from "./ExpandableComponent";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFieldContext } from '../context/FieldProvider';
import DetailsModal from './DetailsModal';

const FarmDetails = ({ farmData, onDelete, onEdit, loading }) => {
    const navigation = useNavigation();
    const { handleDelete, fetchFieldById } = useFieldContext();
    const [localFields, setLocalFields] = useState(farmData.fields || []);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFieldDetails, setSelectedFieldDetails] = useState(null);

    const handleDeleteField = (fieldId) => {
        Alert.alert(
            "Delete Field",
            "Are you sure you want to delete this field?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await handleDelete(fieldId);
                            setLocalFields(prevFields => prevFields.filter(field => field.id !== fieldId));
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete the field. Please try again later.");
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleFieldClick = async (fieldId) => {
        try {
            const fieldDetails = await fetchFieldById(fieldId);
    
            const referenceParcels = fieldDetails.referenceParcels.length > 0 
                ? fieldDetails.referenceParcels.map(parcel => parcel.name).join('\n') 
                : 'No reference parcels available';
    
            const soilMeasurements = fieldDetails.soilMeasurements.length > 0 
                ? fieldDetails.soilMeasurements.map(measurement => measurement.name).join('\n') 
                : 'No soil measurements available';
    
            const crops = fieldDetails.crops.length > 0 
                ? fieldDetails.crops.map(crop => crop.name).join(', ') 
                : 'No crops available';
    
            setSelectedFieldDetails({
                Name: fieldDetails.name,
                Farm: fieldDetails.farm.name,
                Area: `${fieldDetails.area} ha`,
                'Soil Type': fieldDetails.soilType,
                'Reference Parcels': referenceParcels,
                'Soil Measurements': soilMeasurements,
                Crops: crops,
            });
    
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to load field details.');
        }
    };
    
    return (
        <View style={styles.container}>
            <ExpandableComponent title={farmData.name}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Location</Text>
                    <Text style={styles.text}>{farmData.location}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Total Area</Text>
                    <Text style={styles.text}>{`${farmData.totalArea} ha`}</Text>
                </View>
                <View style={styles.line} />
                <ExpandableComponent title="Fields" isExpanded={true} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        localFields && localFields.length > 0 ? (
                            localFields.map((field) => (
                                <React.Fragment key={field.id}>
                                    <View style={styles.infoRowContainer}>
                                        <TouchableOpacity 
                                            style={{ width: '70%' }}
                                            onPress={() => handleFieldClick(field.id)}
                                        >
                                             <View style={styles.rowContainer}>
                                                <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                                <Text style={styles.text}>{field.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate("Edit Field", { fieldId: field.id })}>
                                            <Icon name="edit" size={22} color="#00BFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteField(field.id)}>
                                            <Icon name="delete" size={22} color="#FC7F7F" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={[styles.text, { textAlign: 'center' }]}>There are no fields for this farm</Text>
                        )
                    }
                    <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
                            onPress={() => navigation.navigate('Add Field', { farmId: farmData.id })}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Add Field</Text>
                        </TouchableOpacity>
                    </View>
                    {localFields && localFields.length > 0 && (
                        <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                            <TouchableOpacity 
                                style={[styles.button, { backgroundColor: '#276e33', width: '80%' }]} 
                                onPress={() => navigation.navigate('FieldManagement', { farmId: farmData.id })}
                            >
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Manage Fields</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ExpandableComponent>
                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} 
                        onPress={onEdit}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Edit Farm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#FC7F7F', width: '40%' }]} 
                        onPress={onDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Delete Farm</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>

            <DetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Field Details"
                details={selectedFieldDetails}
            />
        </View>
    );
};

export default FarmDetails;

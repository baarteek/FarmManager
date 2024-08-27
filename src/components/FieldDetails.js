import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import { useSoilMeasurementContext } from '../context/SoilMeasurementProvider';
import { formatDate } from '../utils/DateUtils';

const FieldDetails = ({ fieldData, onDelete }) => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [modalTitle, setModalTitle] = useState('');

    const { fetchSoilMeasurementById, handleDeleteSoilMeasurement } = useSoilMeasurementContext();

    const parseDate = (dateString) => new Date(dateString);

    const sortedSoilMeasurements = fieldData.soilMeasurements
        .map((measurement, index) => ({ ...measurement, originalIndex: index }))
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));

    const handleMeasurementClick = async (measurement) => {
        try {
            const response = await fetchSoilMeasurementById(measurement.id);
            const details = {
                Date: formatDate(parseDate(response.date)),
                pH: `${response.pH}`,
                Nitrogen: `${response.nitrogen} mg/kg`,
                Phosphorus: `${response.phosphorus} mg/kg`,
                Potassium: `${response.potassium} mg/kg`
            };
            
            setSelectedDetails(details);
            setModalTitle('Soil Measurement Details');
            setModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to load soil measurement details.');
        }
    };

    const handleDeleteMeasurement = (id) => {
        Alert.alert(
            "Delete Soil Measurement",
            "Are you sure you want to delete this soil measurement?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    onPress: async () => {
                        await handleDeleteSoilMeasurement(id);
                        setSoilMeasurements(prevMeasurements => prevMeasurements.filter(measurement => measurement.id !== id));
                    } 
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <ExpandableComponent title={fieldData.name}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Area</Text>
                    <Text style={styles.text}>{fieldData.area} ha</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Soil Type</Text>
                    <Text style={styles.text}>{fieldData.soilType}</Text>
                </View>
                <View style={styles.line} />
                <ExpandableComponent title="Soil Measurements" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        sortedSoilMeasurements && sortedSoilMeasurements.length > 0 ? (
                            sortedSoilMeasurements.map((measurement) => (
                                <React.Fragment key={measurement.id}>
                                    <View style={styles.infoRowContainer}>
                                        <TouchableOpacity 
                                            style={{ width: '70%' }}
                                            onPress={() => handleMeasurementClick(measurement)}
                                        >
                                            <View style={styles.rowContainer}>
                                                <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                                <Text style={styles.text}>{measurement.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate("Edit Soil Measurement", { measurementId: measurement.id, fieldId: fieldData.id })}>
                                            <Icon name="edit" size={22} color="#00BFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDeleteMeasurement(measurement.id)}>
                                            <Icon name="delete" size={22} color="#FC7F7F" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <>
                                <Text style={[styles.text, { textAlign: 'center' }]}>There are no soil measurements for this field</Text>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                            </>
                        )
                    }
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#62C962', marginVertical: '5%' }]} 
                        onPress={() => navigation.navigate('Add Soil Measurement', { fieldId: fieldData.id })}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Add Soil Measurement</Text>
                    </TouchableOpacity>
                </ExpandableComponent>
                <ExpandableComponent title="Plot Numbers" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        fieldData.referenceParcels && fieldData.referenceParcels.length > 0 ? (
                            fieldData.referenceParcels.map((referenceParcel) => (
                                <React.Fragment key={referenceParcel.id}>
                                     <View style={styles.infoRowContainer}>
                                        <TouchableOpacity style={{width: '70%'}} onPress={() => handleParcelClick(referenceParcel)}>
                                            <View style={styles.rowContainer}>
                                                <Icon name="search" size={22} color="#A9A9A9" style={{marginRight: '3%'}} />
                                                <Text style={styles.text}>{referenceParcel.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Icon name="edit" size={22} color="#00BFFF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Icon name="delete" size={22} color="#FC7F7F" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={[styles.text, { textAlign: 'center' }]}>There are no plot numbers for this field</Text>
                        )
                    }
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#62C962', marginVertical: '5%' }]} 
                        onPress={() => navigation.navigate('Add Plot Number', { fieldId: fieldData.id })}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Add Plot Number</Text>
                    </TouchableOpacity>
                </ExpandableComponent>

                <TouchableOpacity style={[styles.button, { marginTop: '5%', paddingVertical: '1%', backgroundColor: '#BAF1BA' }]} onPress={() => navigation.navigate('Show Crops', { fieldId: fieldData.id })}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginLeft: '10%', marginRight: '10%', color: '#22734D' }}>Show Crops</Text>
                </TouchableOpacity>
                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]}  onPress={() => navigation.navigate('Edit Field', { field: fieldData })}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Edit Field</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FC7F7F' }]} onPress={onDelete}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Delete Field</Text>
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

export default FieldDetails;
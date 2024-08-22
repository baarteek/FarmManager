import React from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FieldDetails = ({ fieldData, onDelete }) => {
    const navigation = useNavigation();

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
        return new Date(year, month - 1, day);
    };

    const sortedSoilMeasurements = fieldData.soilMeasurements
        .map((measurement, index) => ({ ...measurement, originalIndex: index }))
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));

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
                            sortedSoilMeasurements.map((measurement, index) => (
                                <React.Fragment key={index}>
                                    <View style={styles.infoRowContainer} >
                                        <TouchableOpacity style={{width: '70%'}}>
                                            <Text style={styles.text}>{measurement.name}</Text>
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
                            <>
                                <Text style={[styles.text, { textAlign: 'center' }]}>There are no soil measurements for this field</Text>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                            </>
                        )
                    }
                    <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} onPress={() => navigation.navigate('Add Soil Measurement', { fieldId: fieldData.id })}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>
                <ExpandableComponent title="Plot Numbers" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        fieldData.referenceParcels && fieldData.referenceParcels.length > 0 ? (
                            fieldData.referenceParcels.map((referenceParcels) => (
                                <React.Fragment key={referenceParcels.id}>
                                    <View style={styles.infoRowContainer} >
                                        <TouchableOpacity style={{width: '70%'}}>
                                            <Text style={styles.text}>{referenceParcels.name}</Text>
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
                     <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} onPress={() => navigation.navigate('Add Plot Number', { fieldId: fieldData.id })}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
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
            </ExpandableComponent>
        </View>
    );
};

export default FieldDetails;

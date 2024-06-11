import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/AppStyles';
import ExpandableComponent from './ExpandableComponent';
import { useNavigation } from '@react-navigation/native';
import { useFieldContext } from '../context/FieldProvider';

const CropDetails = ({ crop, fieldId, handleDeleteCrop }) => {
    const navigation = useNavigation();
    const { deleteFertilizationFromCrop } = useFieldContext();

    const handleDeleteFertilization = (fertilizationIndex) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this fertilization record?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteFertilization(fieldId, crop.id, fertilizationIndex), style: "destructive" }
            ],
            { cancelable: false }
        );
    };

    const deleteFertilization = (fieldId, cropId, fertilizationIndex) => {
        deleteFertilizationFromCrop(fieldId, cropId, fertilizationIndex);
    };

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
        return new Date(year, month - 1, day);
    };

    const sortedFertilizationHistory = crop.fertilizationHistory
        .map((fertilization, index) => ({ ...fertilization, originalIndex: index }))
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));

    const sortedPestAndDiseaseHistory = crop.pestAndDiseaseHistory
        .map((history, index) => ({ ...history, originalIndex: index }))
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));

    return (
        <View style={styles.container}>
            <ExpandableComponent title={crop.cropType}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Sowing Date:</Text>
                    <Text style={styles.text}>{crop.sowingDate}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Harvest Date:</Text>
                    <Text style={styles.text}>{crop.harvestDate}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Season:</Text>
                    <Text style={styles.text}>{crop.season}</Text>
                </View>
                <View style={styles.line} />
                <ExpandableComponent title="Fertilization" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {sortedFertilizationHistory && sortedFertilizationHistory.length > 0 ? (
                        sortedFertilizationHistory.map((fertilization, index) => (
                            <React.Fragment key={index}>
                                <Text style={styles.title}>{fertilization.date}</Text>
                                <View style={styles.infoRowContainer}>
                                    <Text style={styles.text}>Type:</Text>
                                    <Text style={styles.text}>{fertilization.type}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                <View style={styles.infoRowContainer}>
                                    <Text style={styles.text}>Quantity:</Text>
                                    <Text style={styles.text}>{fertilization.quantity}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                <View style={styles.infoRowContainer}>
                                    <Text style={styles.text}>Method:</Text>
                                    <Text style={styles.text}>{fertilization.method}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                <View style={styles.container}>
                                    <Text style={[styles.text, { fontWeight: 'bold', marginVertical: '1%' }]}>Description:</Text>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>{fertilization.description}</Text>
                                </View>
                                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Fertilization', { fieldId, cropId: crop.id, fertilizationIndex: fertilization.originalIndex })}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%' }}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FC7F7F' }]} onPress={() => handleDeleteFertilization(fertilization.originalIndex)}>
                                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '10%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <>
                            <Text style={styles.text}>No fertilization history available</Text>
                            <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                        </>
                    )}
                    <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} onPress={() => navigation.navigate('Add Fertilization', { fieldId, cropId: crop.id })}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>
                <ExpandableComponent title="Pest and Disease" isExpanded={false} backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {sortedPestAndDiseaseHistory && sortedPestAndDiseaseHistory.length > 0 ? (
                        sortedPestAndDiseaseHistory.map((history, index) => (
                            <React.Fragment key={index}>
                                <Text style={styles.title}>{history.date}</Text>
                                <View style={styles.infoRowContainer}>
                                    <Text style={styles.text}>Type:</Text>
                                    <Text style={styles.text}>{history.type}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                <View style={styles.infoRowContainer}>
                                    <Text style={styles.text}>Treatment:</Text>
                                    <Text style={styles.text}>{history.treatment}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                <View style={styles.container}>
                                    <Text style={[styles.text, { fontWeight: 'bold', marginVertical: '1%' }]}>Description:</Text>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>{history.description}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '10%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <>
                            <Text style={styles.text}>No pest and disease history available</Text>
                            <View style={[styles.line, { borderColor: '#22734D', marginBottom: '5%', marginTop: '5%' }]} />
                        </>
                    )}
                    <View style={[styles.rowContainer, { justifyContent: 'space-around' }]}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} onPress={() => { }}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>
                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Crop', { fieldId, cropId: crop.id })}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FC7F7F' }]} onPress={() => handleDeleteCrop(crop.id)}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>
        </View>
    );
};

export default CropDetails;

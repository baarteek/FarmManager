import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/AppStyles';
import ExpandableComponent from './ExpandableComponent';
import { useNavigation } from '@react-navigation/native';

const CropDetails = ({ crop, fieldId, handleDeleteCrop }) => {
    const navigation = useNavigation();

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
                <ExpandableComponent title="Fertilization History" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {crop.fertilizationHistory && crop.fertilizationHistory.length > 0 ? (
                        crop.fertilizationHistory.map((fertilization, index) => (
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
                                    <Text style={styles.text}>Description:</Text>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>{fertilization.description}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '10%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <Text style={styles.text}>No fertilization history available</Text>
                    )}
                </ExpandableComponent>
                <ExpandableComponent title="Pest and Disease" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {crop.pestAndDiseaseHistory && crop.pestAndDiseaseHistory.length > 0 ? (
                        crop.pestAndDiseaseHistory.map((history, index) => (
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
                                    <Text style={styles.text}>Description:</Text>
                                    <Text style={[styles.text, { textAlign: 'center' }]}>{history.description}</Text>
                                </View>
                                <View style={[styles.line, { borderColor: '#22734D', marginBottom: '10%' }]} />
                            </React.Fragment>
                        ))
                    ) : (
                        <Text style={styles.text}>No pest and disease history available</Text>
                    )}
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

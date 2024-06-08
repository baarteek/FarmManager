import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/AppStyles";
import ExpandableComponent from "./ExpandableComponent";
import { useNavigation } from '@react-navigation/native';

const FieldDetails = ({ fieldData, onDelete }) => {
    const navigation = useNavigation();

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
                <ExpandableComponent title="Soil Measurements" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        fieldData.soilMeasurements && fieldData.soilMeasurements.length > 0 ? (
                            fieldData.soilMeasurements.map((measurement, index) => (
                                <React.Fragment key={index}>
                                    <Text style={styles.title}>{measurement.date}</Text>
                                    <View style={styles.infoRowContainer}>
                                        <Text style={styles.text}>pH:</Text>
                                        <Text style={styles.text}>{measurement.pH}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                    <View style={styles.infoRowContainer}>
                                        <Text style={styles.text}>Nitrogen:</Text>
                                        <Text style={styles.text}>{measurement.nitrogen}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                    <View style={styles.infoRowContainer}>
                                        <Text style={styles.text}>Phosphorus:</Text>
                                        <Text style={styles.text}>{measurement.phosphorus}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                    <View style={styles.infoRowContainer}>
                                        <Text style={styles.text}>Potassium:</Text>
                                        <Text style={styles.text}>{measurement.potassium}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#22734D', marginBottom: '10%'}]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={styles.text}>There are no soil measurements for this field</Text>
                        )
                    }
                </ExpandableComponent>
                <ExpandableComponent title="Plot Numbers" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        fieldData.plotNumbers && fieldData.plotNumbers.length > 0 ? (
                            fieldData.plotNumbers.map((plotNumber, index) => (
                                <React.Fragment key={index}>
                                    <Text style={[styles.text, { fontSize: 14}]}>{plotNumber}</Text>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={styles.text}>There are no plot numbers for this field</Text>
                        )
                    }
                </ExpandableComponent>
                <TouchableOpacity style={[styles.button, {marginTop: '5%', paddingVertical: '1%', backgroundColor: '#BAF1BA'}]} onPress={() => navigation.navigate('Show Crops')}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginLeft: '10%', marginRight: '10%', color: '#22734D'}}>Show Crops</Text>
                    </TouchableOpacity>
                <View style={[styles.rowContainer, {justifyContent: 'space-around', marginTop: '3%'}]}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Edit Field', { field: fieldData })}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#FC7F7F'}]} onPress={onDelete}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>
        </View>
    );
};

export default FieldDetails;

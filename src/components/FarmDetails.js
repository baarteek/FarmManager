import React from 'react';
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import ExpandableComponent from "./ExpandableComponent";

const FarmDetails = ({ farmData, onDelete }) => {
    const navigation = useNavigation();

    const confirmDeleteFarm = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this farm?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: onDelete, style: "destructive" }
            ],
            { cancelable: false }
        );
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
                        farmData.fields && farmData.fields.length > 0 ? (
                            farmData.fields.map((field, index) => (
                                <React.Fragment key={index}>
                                    <TouchableOpacity 
                                        style={styles.infoRowContainer}
                                        onPress={() => navigation.navigate('FieldDetails', { field })}
                                    >
                                        <Text style={styles.text}>{field.name}</Text>
                                    </TouchableOpacity>
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
                    {farmData.fields && farmData.fields.length > 0 && (
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
                        onPress={() => navigation.navigate('Edit Farm', { farm: farmData })}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Edit Farm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#FC7F7F', width: '40%' }]} 
                        onPress={confirmDeleteFarm}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginHorizontal: 10 }}>Delete Farm</Text>
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>
        </View>
    );
};

export default FarmDetails;

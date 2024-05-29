import React from 'react';
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpandableComponent from "./ExpandableComponent";
import { styles } from "../styles/AppStyles";

const CropDetails = ({ cropData, onDelete }) => {
    return (
        <View style={styles.container}>
            <ExpandableComponent title={cropData.cropType}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Crop Type</Text>
                    <Text style={styles.text}>{cropData.cropType}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Sowing Date</Text>
                    <Text style={styles.text}>{cropData.sowingDate}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Harvest Date</Text>
                    <Text style={styles.text}>{cropData.harvestDate}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Season</Text>
                    <Text style={styles.text}>{cropData.season}</Text>
                </View>
                <View style={styles.line} />
                <ExpandableComponent title="Fertilization History" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        cropData.fertilizationHistory && cropData.fertilizationHistory.length > 0 ? (
                            cropData.fertilizationHistory.map((entry, index) => (
                                <React.Fragment key={index}>
                                    <View style={styles.infoRowContainer}>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.date}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.type} - {entry.quantity}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.method}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.description}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={styles.text}>No fertilization history</Text>
                        )
                    }
                </ExpandableComponent>
                <ExpandableComponent title="Pest and Disease History" backgroundColor="#BAF1BA" style={{ width: '100%' }}>
                    {
                        cropData.pestAndDiseaseHistory && cropData.pestAndDiseaseHistory.length > 0 ? (
                            cropData.pestAndDiseaseHistory.map((entry, index) => (
                                <React.Fragment key={index}>
                                    <View style={styles.infoRowContainer}>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.date}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.type}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.treatment}</Text>
                                        <Text style={[styles.text, { fontSize: 14 }]}>{entry.description}</Text>
                                    </View>
                                    <View style={[styles.line, { borderColor: '#DFF6DF' }]} />
                                </React.Fragment>
                            ))
                        ) : (
                            <Text style={styles.text}>No pest or disease history</Text>
                        )
                    }
                </ExpandableComponent>
                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '3%' }]}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginLeft: '10%', marginRight: '10%', color: '#22734D' }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FC7F7F' }]} onPress={() => onDelete(cropData.id)}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>
        </View>
    );
};

export default CropDetails;

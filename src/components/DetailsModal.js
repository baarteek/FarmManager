import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const soilTypeMap = {
    0: "Nie wybrano",
    1: "Brunatna",
    2: "Czarnoziem",
    3: "Bielicowa",
    4: "Płowa",
    5: "Torfowa",
    6: "Murszowa",
    7: "Aluwialna",
    8: "Rędzina",
    9: "Lessowa",
    10: "Gliniasta",
    11: "Piaszczysta",
    12: "Inna"
};

const DetailsModal = ({ visible, onClose, title, details }) => {
    const formattedDetails = { ...details };
    if (formattedDetails["Typ gleby"] && soilTypeMap[formattedDetails["Typ gleby"]]) {
        formattedDetails["Typ gleby"] = soilTypeMap[formattedDetails["Typ gleby"]];
    }

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>

                    <ScrollView style={styles.detailsScrollContainer}>
                        <View style={styles.detailsContainer}>
                            {formattedDetails && Object.entries(formattedDetails).map(([key, value]) => (
                                <View key={key} style={styles.detailRow}>
                                    <Text style={styles.detailKey}>{key}:</Text>
                                    <Text style={styles.detailValue}>{value || "Brak wartości"}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Zamknij</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#22734D',
        marginBottom: 15,
        textAlign: 'center',
    },
    detailsScrollContainer: {
        maxHeight: 300,
        width: '100%',
    },
    detailsContainer: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#E6EDE9',
    },
    detailRow: {
        flexDirection: 'column',
        marginBottom: 12,
    },
    detailKey: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 3,
    },
    detailValue: {
        fontSize: 16,
        color: '#555',
        textAlign: 'justify',
    },
    closeButton: {
        backgroundColor: '#62C962',
        padding: 12,
        borderRadius: 8,
        width: '50%',
        alignItems: 'center',
        marginTop: 15,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DetailsModal;
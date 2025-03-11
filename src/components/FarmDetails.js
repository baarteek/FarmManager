import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles/AppStyles';
import ExpandableComponent from "./ExpandableComponent";
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailsModal from './DetailsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FarmDetails = ({ farmData, onDelete, onEdit, loading }) => {
    const navigation = useNavigation();
    const [localFields, setLocalFields] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFieldDetails, setSelectedFieldDetails] = useState(null);

    const loadFields = async () => {
        try {
            const storedFields = await AsyncStorage.getItem('fields');
            if (storedFields) {
                const parsedFields = JSON.parse(storedFields);
                const farmFields = parsedFields.filter(field => field.farmId === farmData.id);
                setLocalFields(farmFields);
            } else {
                setLocalFields([]);
            }
        } catch (error) {
            console.error("Błąd podczas ładowania pól:", error);
        }
    };

    useEffect(() => {
        loadFields();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            loadFields();
        }, [])
    );

    const handleDeleteField = async (fieldId) => {
        Alert.alert(
            "Usuń pole",
            "Czy na pewno chcesz usunąć to pole?",
            [
                { text: "Anuluj", style: "cancel" },
                {
                    text: "Usuń",
                    onPress: async () => {
                        try {
                            const storedFields = await AsyncStorage.getItem('fields');
                            if (storedFields) {
                                let parsedFields = JSON.parse(storedFields);
                                parsedFields = parsedFields.filter(field => field.id !== fieldId);
                                await AsyncStorage.setItem('fields', JSON.stringify(parsedFields));

                                setLocalFields(parsedFields.filter(field => field.farmId === farmData.id));
                            }
                        } catch (error) {
                            console.error("Błąd podczas usuwania pola:", error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleFieldClick = (field) => {
        const referenceParcels = field.referenceParcels?.length > 0 
            ? field.referenceParcels.map(parcel => parcel.name).join('\n') 
            : 'Brak dostępnych działek';

        const soilMeasurements = field.soilMeasurements?.length > 0 
            ? field.soilMeasurements.map(measurement => measurement.name).join('\n') 
            : 'Brak dostępnych pomiarów gleby';

        const crops = field.crops?.length > 0 
            ? field.crops.map(crop => crop.name).join('\n') 
            : 'Brak upraw';

        setSelectedFieldDetails({
            Nazwa: field.name,
            Gospodarstwo: farmData.name,
            Powierzchnia: `${field.area} ha`,
            "Typ gleby": field.soilType,
            "Działki referencyjne": referenceParcels,
            "Pomiary gleby": soilMeasurements,
            Uprawy: crops,
        });

        setModalVisible(true);
    };

    return (
        <View style={[styles.container, { width: '100%', justifyContent: 'center' }]}>
            <ExpandableComponent title={farmData.name}>
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Lokalizacja</Text>
                    <Text style={styles.text}>{farmData.location}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.infoRowContainer}>
                    <Text style={styles.text}>Powierzchnia</Text>
                    <Text style={styles.text}>{`${farmData.totalArea} ha`}</Text>
                </View>
                <View style={styles.line} />

                <ExpandableComponent title="Pola" isExpanded={true} backgroundColor="#BAF1BA">
                    {localFields.length > 0 ? (
                        localFields.map((field) => (
                            <View key={field.id} style={styles.infoRowContainer}>
                                <TouchableOpacity 
                                    style={{ width: '70%' }}
                                    onPress={() => handleFieldClick(field)}
                                >
                                    <View style={styles.rowContainer}>
                                        <Icon name="search" size={22} color="#A9A9A9" style={{ marginRight: '3%' }} />
                                        <Text style={styles.text}>{field.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Edytuj Pole", { field })}>
                                    <Icon name="edit" size={22} color="#00BFFF" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteField(field.id)}>
                                    <Icon name="delete" size={22} color="#FC7F7F" />
                                </TouchableOpacity>
                            </View>
                        ))
                    ) : (
                        <Text style={[styles.text, { textAlign: 'center' }]}>Brak pól dla tego gospodarstwa</Text>
                    )}
                    <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#00E000', width: '80%' }]} 
                            onPress={() => navigation.navigate('Dodaj Pole', { farmId: farmData.id })}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Dodaj Pole</Text>
                        </TouchableOpacity>
                    </View>
                </ExpandableComponent>

                <View style={[styles.rowContainer, { justifyContent: 'space-around', marginTop: '5%' }]}>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#00BFFF', width: '40%' }]} 
                        onPress={onEdit}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Edytuj Gospodarstwo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: '#FC7F7F', width: '40%' }]} 
                        onPress={onDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Usuń Gospodarstwo</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ExpandableComponent>

            <DetailsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Szczegóły pola"
                details={selectedFieldDetails}
            />
        </View>
    );
};

export default FarmDetails;
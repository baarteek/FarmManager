import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator, Switch } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { useCropContext } from '../../context/CropProvider';
import { useFieldContext } from '../../context/FieldProvider';
import { Picker } from '@react-native-picker/picker';
import CropTypePicker from '../../components/CropTypePicker';
import { useFarmContext } from '../../context/FarmProvider';

const AddCropScreen = () => {
    const navigation = useNavigation();
    const { addCrop, loading } = useCropContext();
    const { fieldList, fetchFieldsNamesAndId, error: fieldsError } = useFieldContext();
    const { farms, fetchFarmsNamesAndId, error: farmsError } = useFarmContext();

    const [selectedFarmId, setSelectedFarmId] = useState('');
    const [selectedFieldId, setSelectedFieldId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loadingFields, setLoadingFields] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        fetchFarmsNamesAndId();
    }, []);

    useEffect(() => {
        if (farms.length > 0 && !selectedFarmId) {
            setSelectedFarmId(farms[0].id);
        }
    }, [farms]);

    useEffect(() => {
        if (fieldList.length > 0 && !selectedFieldId) {
            setSelectedFieldId(fieldList[0].id);
        }
    }, [fieldList]);

    const handleFetchFields = async () => {
        if (selectedFarmId) {
            setLoadingFields(true);
            await fetchFieldsNamesAndId(selectedFarmId);
            setLoadingFields(false);
            setStep(2);
        } else {
            Alert.alert("Select Farm", "Please select a farm first.");
        }
    };

    const handleSave = async () => {
        if (!name || !type || !selectedFieldId) {
            Alert.alert("Missing Information", "Please provide all necessary details for the crop.");
            return;
        }

        const newCrop = {
            name,
            type: parseInt(type, 10),
            isActive,
            fieldId: selectedFieldId
        };

        try {
            await addCrop(newCrop);
            Alert.alert("Success", "Crop added successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
        } catch (error) {
            Alert.alert("Error", "Failed to add the crop. Please try again later.");
        }
    };

    const onChangeSowingDate = (event, selectedDate) => {
        const currentDate = selectedDate || sowingDate;
        setSowingDate(currentDate);
    };

    const onChangeHarvestDate = (event, selectedDate) => {
        const currentDate = selectedDate || harvestDate;
        setHarvestDate(currentDate);
    };

    if (loading || loadingFields) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (farmsError || fieldsError) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
                    {farmsError || fieldsError}
                </Text>
            </View>
        );
    }

    if (farms.length === 0) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    No farms found. Please add a farm first.
                </Text>
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={() => navigation.navigate('Add Farm')}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Add Farm
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (step === 2 && fieldList.length === 0) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    No fields found for the selected farm. Please add a field first.
                </Text>
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={() => navigation.navigate('FieldManagementMain')}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Add Field
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
            <ScrollView style={styles.mainCantainer}>
                {step === 1 && (
                    <>
                        <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Farm</Text>
                        <Picker
                            selectedValue={selectedFarmId}
                            onValueChange={(itemValue) => setSelectedFarmId(itemValue)}
                            style={styles.picker}
                        >
                            {farms.map(farm => (
                                <Picker.Item key={farm.id} label={farm.name} value={farm.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity 
                            style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                            onPress={handleFetchFields}
                            disabled={!selectedFarmId}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Field</Text>
                        <Picker
                            selectedValue={selectedFieldId}
                            onValueChange={(itemValue) => setSelectedFieldId(itemValue)}
                            style={styles.picker}
                        >
                            {fieldList.map(field => (
                                <Picker.Item key={field.id} label={field.name} value={field.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity 
                            style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                            onPress={() => setStep(3)}
                            disabled={!selectedFieldId}
                        >
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Text style={[styles.largeText, { textAlign: 'center' }]}>Crop Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter crop name"
                            value={name}
                            onChangeText={setName}
                        />
                        <View style={[styles.infoRowContainer, styles.containerWithBorder, { marginVertical: '1%', justifyContent: 'space-around', paddingVertical: '1%' }]}>
                            <Text style={[styles.largeText, { padding: '1%' }]}>Is Active</Text>
                            <Switch value={isActive} onValueChange={setIsActive} />
                        </View>
                        <View style={styles.containerWithBorder}>
                            <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Crop Type</Text>
                            <CropTypePicker selectedCropType={type} setSelectedCropType={setType} />
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="large" color="#fff" />
                            ) : (
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                                    Add Crop
                                </Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
    );
};

export default AddCropScreen;

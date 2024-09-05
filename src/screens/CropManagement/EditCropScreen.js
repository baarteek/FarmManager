import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator, Switch } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/AppStyles';
import { useCropContext } from '../../context/CropProvider';
import CropTypePicker from '../../components/CropTypePicker';

const EditCropScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { crops, editCrop, loading } = useCropContext();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [sowingDate, setSowingDate] = useState(new Date());
    const [harvestDate, setHarvestDate] = useState(new Date());
    const [isActive, setIsActive] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const crop = crops.find(crop => crop.id === id);

        if (crop) {
            setName(crop.name);
            setType(crop.type.toString());
            setSowingDate(new Date(crop.sowingDate));
            setHarvestDate(new Date(crop.harvestDate));
            setIsActive(crop.isActive);
        } else {
            Alert.alert("Error", "Crop not found.");
            navigation.goBack();
        }

        setInitialLoading(false);
    }, [id, crops, navigation]);

    const handleSave = async () => {
        if (!name || !type) {
            Alert.alert(
                "Missing Information",
                "Please provide all necessary details for the crop."
            );
            return;
        }

        const updatedCrop = {
            id,
            name,
            type: parseInt(type, 10),
            sowingDate: sowingDate,
            harvestDate: harvestDate,
            isActive
        };

        try {
            await editCrop(id, updatedCrop);
            Alert.alert(
                "Success",
                "Crop updated successfully!",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to update the crop. Please try again later."
            );
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

    if (initialLoading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#fff' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '10%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Crop Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter crop name"
                    value={name}
                    onChangeText={setName}
                />
                 <View style={[styles.infoRowContainer, styles.containerWithBorder, { marginVertical: '1%', justifyContent: 'space-around', paddingVertical: '1%' }]}>
                    <Text style={[styles.largeText, { padding: '1%' }]}>Is Active</Text>
                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                    />
                </View>
                <View style={styles.containerWithBorder}>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Crop Type</Text>
                    <CropTypePicker selectedCropType={type} setSelectedCropType={setType} />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Sowing Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={sowingDate}
                        mode="date"
                        display="default"
                        onChange={onChangeSowingDate}
                        style={{ alignSelf: 'center', marginVertical: '2%' }}
                    />
                </View>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Harvest Date</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <DateTimePicker
                        value={harvestDate}
                        mode="date"
                        display="default"
                        onChange={onChangeHarvestDate}
                        style={{ alignSelf: 'center', marginVertical: '2%' }}
                    />
                </View>
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: 10 }}>
                            Save Changes
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditCropScreen;

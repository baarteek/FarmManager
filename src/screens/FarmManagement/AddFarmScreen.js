import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { useFarmContext } from '../../context/FarmProvider';
import { formatDecimalInput } from '../../utils/TextUtils';

const AddFarmScreen = () => {
    const navigation = useNavigation();
    const { addFarm, loading } = useFarmContext(); 
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [totalArea, setTotalArea] = useState('');

    const handleAddFarm = async () => {
        if (!name || !totalArea) {
            Alert.alert(
                "Missing Information",
                "Please provide both a name and a total area for the farm."
            );
            return;
        }

        const newFarm = {
            name,
            location,
            totalArea: formatDecimalInput(totalArea),
        };

        try {
            await addFarm(newFarm);
            Alert.alert(
                "Farm Added",
                "The new farm has been successfully added.",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to add the farm. Please try again later."
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]} >
            <ScrollView style={{ width: '100%', paddingTop: '10%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Farm Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter farm name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter farm location"
                    value={location}
                    onChangeText={setLocation}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Total Area (ha)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0.00 ha"
                    value={totalArea}
                    onChangeText={setTotalArea}
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleAddFarm}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginHorizontal: 10 }}>
                            Add New Farm
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddFarmScreen;

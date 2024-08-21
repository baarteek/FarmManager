import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFarmContext } from '../../context/FarmProvider';
import { formatDecimalInput } from '../../utils/TextUtils';

const FarmEditScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const { farms, editFarm, loading } = useFarmContext();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [totalArea, setTotalArea] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const farm = farms.find(farm => farm.id === id);

        if (farm) {
            setName(farm.name);
            setLocation(farm.location);
            setTotalArea(farm.totalArea?.toString());
        } else {
            Alert.alert("Error", "Farm not found.");
            navigation.goBack();
        }

        setInitialLoading(false);
    }, [id, farms, navigation]);

    const handleSave = async () => {
        if (!name || !totalArea) {
            Alert.alert(
                "Missing Information",
                "Please provide both a name and a total area for the farm."
            );
            return;
        }

        const updatedFarm = {
            id,
            name,
            location,
            totalArea: formatDecimalInput(totalArea)
        };

        try {
            await editFarm(updatedFarm);
            Alert.alert(
                "Success",
                "Farm updated successfully!",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "Failed to update the farm. Please try again later."
            );
        }
    };

    if (initialLoading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

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

export default FarmEditScreen;

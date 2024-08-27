import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from '../../styles/AppStyles';
import { usePlotNumberContext } from '../../context/PlotNumberProvider';
import { formatDecimalInput } from '../../utils/TextUtils';

const AddPlotNumberScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { fieldId } = route.params;
    const { addPlotNumber } = usePlotNumberContext();

    const [parcelNumber, setParcelNumber] = useState('');
    const [area, setArea] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddPlotNumber = async () => {
        if (!parcelNumber || !area) {
            Alert.alert('Validation Error', 'All fields must be filled in.');
            return;
        }

        const newPlotNumber = {
            fieldId,
            parcelNumber: parcelNumber.trim(),
            area: formatDecimalInput(area),
        };

        setLoading(true);

        try {
            await addPlotNumber(newPlotNumber);
            Alert.alert(
                "Plot Number Added",
                "The new plot number has been successfully added.",
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to add plot number. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Parcel Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Parcel Number"
                    value={parcelNumber}
                    onChangeText={setParcelNumber}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Area (ha)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Area"
                    value={area}
                    onChangeText={setArea}
                    keyboardType="numeric"
                />
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                    onPress={handleAddPlotNumber}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%' }}>
                            Add Plot Number
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddPlotNumberScreen;

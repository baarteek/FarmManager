import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from "react-native";
import { styles } from "../../styles/AppStyles";
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFieldContext } from '../../context/FieldProvider';
import { formatDecimalInput } from '../../utils/TextUtils';

const EditFieldScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { editField } = useFieldContext();
    const { field } = route.params;

    const [name, setName] = useState(field.name);
    const [area, setArea] = useState(field.area.toFixed(2));
    const [soilType, setSoilType] = useState(field.soilType);


    const handleSaveField = async () => {
        if (!name || !area || soilType === null) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        const updatedField = {
            farmId: field.farm.id,
            name,
            area: formatDecimalInput(area),
            soilType: parseInt(soilType),
        };

        try {
            await editField(field.id, updatedField);
            Alert.alert("Field Updated", "The field has been successfully updated.", [
                { text: "OK", onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error("Error updating field:", error);
            Alert.alert("Error", "Failed to update the field. Please try again later.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={[styles.mainCantainer, { justifyContent: 'center', alignItems: 'center' }]}>
            <ScrollView style={{ width: '100%', paddingTop: '5%' }}>
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Field Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter field name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={[styles.largeText, { textAlign: 'center' }]}>Area (ha)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter area in ha"
                    value={area}
                    onChangeText={setArea}
                    keyboardType="decimal-pad"
                />
                <View style={styles.containerWithBorder}>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Soil Type</Text>
                    <Picker
                        selectedValue={soilType}
                        onValueChange={(itemValue) => setSoilType(itemValue)}
                    >
                        <Picker.Item label="Loamy" value={0} />
                        <Picker.Item label="Sandy" value={1} />
                        <Picker.Item label="Clay" value={2} />
                        <Picker.Item label="Silty" value={3} />
                    </Picker>
                </View>
                <TouchableOpacity style={[styles.button, { margin: '5%', marginTop: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} onPress={handleSaveField}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>Save Field</Text>
                </TouchableOpacity>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default EditFieldScreen;

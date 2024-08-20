import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { styles } from '../../styles/AppStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from '../../components/WarningView';
import { useFieldContext } from '../../context/FieldProvider';
import CropDetails from '../../components/CropDetails';

const ShowCropsScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { fields, deleteCropFromField } = useFieldContext();
    const { fieldId } = route.params;

    const [crops, setCrops] = useState([]);

    useEffect(() => {
        const field = fields.find(f => f.id === fieldId);
        if (field) {
            setCrops(field.crops || []);
        }
    }, [fields, fieldId]);

    const handleDeleteCrop = (cropId) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this crop?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteCrop(cropId), style: "destructive" }
            ],
            { cancelable: false }
        );
    };

    const deleteCrop = (cropId) => {
        deleteCropFromField(fieldId, cropId);
    };

    return (
        <View style={[styles.mainContainer, { height: '100%' }]}>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                {crops.length > 0 ? (
                    crops.map((crop, index) => (
                        <CropDetails key={index} crop={crop} fieldId={fieldId} handleDeleteCrop={handleDeleteCrop} />
                    ))
                ) : (
                    <WarningView title="No crops available" message="Please add crops by clicking the plus button" />
                )}
            </ScrollView>
            <FloatingActionButton onPress={() => navigation.navigate('Add Crop', { fieldId })} />
        </View>
    );
};

export default ShowCropsScreen;

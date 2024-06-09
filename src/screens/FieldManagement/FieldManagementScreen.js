import React from 'react';
import { Alert, ScrollView, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import FieldDetails from "../../components/FieldDetails";
import { useNavigation } from "@react-navigation/native";
import FloatingActionButton from '../../components/FloatingActionButton';
import WarningView from "../../components/WarningView";
import { useFieldContext } from '../../context/FieldProvider';

const FieldManagementScreen = () => {
    const navigation = useNavigation();
    const { fields, handleDelete } = useFieldContext();

    const confirmDelete = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this field?",
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => handleDelete(id),
                    style: 'destructive'
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.mainCantainer}>
            {fields.length === 0 ? (
                <WarningView title="No fields available" message="Please add fields by clicking the plus button" />
            ) : (
                <ScrollView style={styles.mainContainer}>
                    {fields.map((field) => (
                        <FieldDetails 
                            fieldData={field} 
                            key={field.id} 
                            onDelete={() => confirmDelete(field.id)}
                            onEdit={() => navigation.navigate('Edit Field', { field })}
                        />
                    ))}
                </ScrollView>
            )}
            <FloatingActionButton onPress={() => navigation.navigate('Add Field')} />
        </View>
    );
};

export default FieldManagementScreen;

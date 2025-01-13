import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AppStyles';
import { FontAwesome6, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const LatestOperations = ({ data }) => {
    if (!data) {
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.warningText}>No recent operations available.</Text>
            </View>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderRow = (label, value) => {
        if (!value || value === "No Value") return null;
        return (
            <View style={styles.infoRowContainer}>
                <Text style={styles.text}>{label}</Text>
                <Text style={styles.largeText}>{value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.bottomContainer}>
            <View style={styles.content}>
                <View style={styles.innerContainer}>
                    <View style={styles.rowContainer}>
                        <FontAwesome6 name="seedling" size={24} color="#22532A" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Cultivation Operation</Text>
                        <FontAwesome6 name="seedling" size={24} color="#22532A" />
                    </View>
                    {renderRow("Name:", data.cultivationOperationName)}
                    {renderRow("Date:", formatDate(data.cultivationOperationDate))}
                    {renderRow("Description:", data.cultivationOperationDescription)}
                    {renderRow("Crop:", data.cultivationOperationCrop?.name)}
                </View>

                <View style={styles.line} />

                <View style={styles.innerContainer}>
                    <View style={styles.rowContainer}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#22532A" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Plant Protection</Text>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#22532A" />
                    </View>
                    {renderRow("Name:", data.plantProtectionName)}
                    {renderRow("Date:", formatDate(data.plantProtectionDate))}
                    {renderRow("Description:", data.plantProtectionDescription)}
                    {renderRow("Crop:", data.plantProtectionCrop?.name)}
                </View>

                <View style={styles.line} />

                <View style={styles.innerContainer}>
                    <View style={styles.rowContainer}>
                        <Entypo name="drop" size={24} color="#22532A" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Fertilization</Text>
                        <Entypo name="drop" size={24} color="#22532A" />
                    </View>
                    {renderRow("Name:", data.fertilizationName)}
                    {renderRow("Date:", formatDate(data.fertilizationDate))}
                    {renderRow("Description:", data.fertilizationDescription)}
                    {renderRow("Crop:", data.fertilizationCrop?.name)}
                </View>
            </View>
        </View>
    );
};

export default LatestOperations;
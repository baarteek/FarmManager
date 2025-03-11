import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/AppStyles';
import { FontAwesome6, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const LatestOperations = ({ data }) => {
    const isEmptyDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date.getTime()) || date.getTime() === new Date('1970-01-01').getTime();
    };

    const isDataEmpty = () => {
        return (
            !data ||
            (!data.cultivationOperationName && isEmptyDate(data.cultivationOperationDate) && !data.cultivationOperationDescription && !data.cultivationOperationCrop) &&
            (!data.plantProtectionName && isEmptyDate(data.plantProtectionDate) && !data.plantProtectionDescription && !data.plantProtectionCrop) &&
            (!data.fertilizationName && isEmptyDate(data.fertilizationDate) && !data.fertilizationDescription && !data.fertilizationCrop)
        );
    };

    if (isDataEmpty()) {
        return (
            <View style={styles.bottomContainer}>
                <Text style={styles.warningText}>Brak ostatnich operacji.</Text>
            </View>
        );
    }

    const formatDate = (dateString) => {
        if (isEmptyDate(dateString)) return "Brak daty";
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    };

    const formatTime = (dateString) => {
        if (isEmptyDate(dateString)) return "Brak godziny";
        const date = new Date(dateString);
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    };

    const renderRow = (label, value) => {
        if (!value || value === "Brak wartości") return null;
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
                        <FontAwesome6 name="seedling" size={24} color="#4CAF50" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Zabieg uprawowy</Text>
                        <FontAwesome6 name="seedling" size={24} color="#4CAF50" />
                    </View>
                    {renderRow("Nazwa:", data.cultivationOperationName)}
                    {renderRow("Data:", formatDate(data.cultivationOperationDate))}
                    {renderRow("Godzina:", formatTime(data.cultivationOperationDate))}
                    {renderRow("Opis:", data.cultivationOperationDescription)}
                    {renderRow("Uprawa:", data.cultivationOperationCrop?.name)}
                </View>

                <View style={styles.line} />

                <View style={styles.innerContainer}>
                    <View style={styles.rowContainer}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#1976D2" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Ochrona roślin</Text>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#1976D2" />
                    </View>
                    {renderRow("Nazwa:", data.plantProtectionName)}
                    {renderRow("Data:", formatDate(data.plantProtectionDate))}
                    {renderRow("Godzina:", formatTime(data.plantProtectionDate))}
                    {renderRow("Opis:", data.plantProtectionDescription)}
                    {renderRow("Uprawa:", data.plantProtectionCrop?.name)}
                </View>

                <View style={styles.line} />

                <View style={styles.innerContainer}>
                    <View style={styles.rowContainer}>
                        <Entypo name="drop" size={24} color="#FF9800" />
                        <Text style={[styles.subtitle, { marginHorizontal: '3%' }]}>Nawożenie</Text>
                        <Entypo name="drop" size={24} color="#FF9800" />
                    </View>
                    {renderRow("Nazwa:", data.fertilizationName)}
                    {renderRow("Data:", formatDate(data.fertilizationDate))}
                    {renderRow("Godzina:", formatTime(data.fertilizationDate))}
                    {renderRow("Opis:", data.fertilizationDescription)}
                    {renderRow("Uprawa:", data.fertilizationCrop?.name)}
                </View>

            </View>
        </View>
    );
};

export default LatestOperations;
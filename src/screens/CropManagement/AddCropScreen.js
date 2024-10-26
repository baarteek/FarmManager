import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Picker, ScrollView } from 'react-native';
import { styles } from '../../styles/AppStyles';
import { useReportsContext } from "../../context/ReportsProvider";
import { useFarmContext } from "../../context/FarmProvider";

const ReportsScreen = () => {
    const { fetchAgrotechnicalActivitiesReport, loading: reportLoading, error: reportError } = useReportsContext();
    const { farmList, fetchFarmsNamesAndId, loading: farmLoading, error: farmError } = useFarmContext();

    const [selectedFarmId, setSelectedFarmId] = useState(null);
    const [step, setStep] = useState(1); // Etap 1: Wybór farmy, Etap 2: Wybór raportu
    const [selectedReportType, setSelectedReportType] = useState(null);

    useEffect(() => {
        fetchFarmsNamesAndId();
    }, []);

    const handleGenerateReport = async () => {
        if (!selectedFarmId) {
            Alert.alert("Select Farm", "Please select a farm first.");
            return;
        }

        try {
            await fetchAgrotechnicalActivitiesReport(selectedFarmId);
            Alert.alert("Report Generated", "The report has been generated successfully!");
        } catch (error) {
            Alert.alert("Error", "Failed to generate the report. Please try again later.");
        }
    };

    if (farmLoading || reportLoading) {
        return (
            <View style={styles.mainContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (farmError || reportError) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
                    {farmError || reportError}
                </Text>
                <TouchableOpacity 
                    style={[styles.button, { marginTop: 20 }]} 
                    onPress={() => setStep(1)}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Back to Menu</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.mainContainer, { paddingHorizontal: '5%' }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {step === 1 && (
                    <>
                        <Text style={[styles.largeText, { textAlign: 'center', marginVertical: 20 }]}>Select Farm</Text>
                        <Picker
                            selectedValue={selectedFarmId}
                            onValueChange={(itemValue) => setSelectedFarmId(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a Farm" value={null} />
                            {farmList.map(farm => (
                                <Picker.Item key={farm.id} label={farm.name} value={farm.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity 
                            style={[styles.button, { marginTop: 20, backgroundColor: '#62C962' }]} 
                            onPress={() => setStep(2)}
                            disabled={!selectedFarmId}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Next</Text>
                        </TouchableOpacity>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Text style={[styles.largeText, { textAlign: 'center', marginVertical: 20 }]}>Select Report Type</Text>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#4CAF50', marginBottom: 15 }]} 
                            onPress={() => { setSelectedReportType("General"); handleGenerateReport(); }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Generate General Report</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#FF5722', marginBottom: 15 }]} 
                            onPress={() => { setSelectedReportType("PDF"); handleGenerateReport(); }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Download Report (PDF)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#2196F3' }]} 
                            onPress={() => { setSelectedReportType("XLS"); handleGenerateReport(); }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Download Report (XLS)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button, { marginTop: 20, backgroundColor: '#FF5722' }]} 
                            onPress={() => setStep(1)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Back to Menu</Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default ReportsScreen;

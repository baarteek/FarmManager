import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import InfoCard from "../../components/InfoCard";
import { styles } from '../../styles/AppStyles';
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generatePdfReport, generateAgrotechnicalActivitiesReportHtml } from "../../utils/ReportCreator";

const ReportsScreen = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [selectedFarmId, setSelectedFarmId] = useState('');
    const [selectedReportType, setSelectedReportType] = useState('');
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFarmsFromStorage = async () => {
            try {
                const farmsData = await AsyncStorage.getItem('farms');
                if (!farmsData) {
                    throw new Error("Brak zapisanych gospodarstw w pamięci.");
                }
                
                const parsedFarms = JSON.parse(farmsData);
                console.log("parsed farms: " + parsedFarms[0].id);
                if (!Array.isArray(parsedFarms) || parsedFarms.length === 0) {
                    throw new Error("Brak gospodarstw do wyświetlenia.");
                }

                setFarms(parsedFarms);
                setSelectedFarmId(parsedFarms[0].id);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmsFromStorage();
    }, []);

    const handleGenerateReport = async () => {
        if (!selectedFarmId) {
            setStep(0);
            return;
        }
        try {
            if (selectedReportType === 'html') {
                const htmlContent = await generateAgrotechnicalActivitiesReportHtml("1741774067389");
                navigation.navigate('ViewReport', { htmlContent });
            } else if (selectedReportType === 'pdf') {
                await generatePdfReport(selectedFarmId);
            } else if (selectedReportType === 'xls') {
                console.log(`Generowanie raportu XLS dla farmy: ${selectedFarmId}`);
            }
        } catch (error) {
            console.error('Błąd generowania raportu:', error);
        } finally {
            setStep(0);
        }
    };

    if (loading) {
        return <LoadingView />;
    }

    if (error) {
        return (
            <>
                <ErrorView message={error} />
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#555', alignSelf: 'center' }]} 
                    onPress={() => {
                        setError(null);
                        setStep(0);
                    }}
                >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                        Back
                    </Text>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <View style={styles.mainContainer}>
            {step === 0 && (
                <ScrollView style={{ backgroundColor: '#fff', height: '100%', paddingTop: '5%' }} showsVerticalScrollIndicator={false}>
                    <View style={reportStyles.categoryContainer}>
                        <Text style={[reportStyles.categoryTitle, { color: '#555' }]}>List of Agrotechnical Activities</Text>                    
                        <InfoCard 
                            title="Generate Report"
                            description="Generate a comprehensive overview report."
                            iconName="assessment"
                            iconBackgroundColor="#4CAF50"
                            borderColor="#388E3C"
                            titleColor="#388E3C"
                            onPress={() => {
                                setSelectedReportType('html');
                                setStep(1);
                            }}
                        />
                        <InfoCard 
                            title="Download Report (PDF)"
                            description="Download the report in PDF format for easy sharing and printing."
                            iconName="picture-as-pdf"
                            iconBackgroundColor="#FF5722"
                            borderColor="#E64A19"
                            titleColor="#E64A19"
                            onPress={() => {
                                setSelectedReportType('pdf');
                                setStep(1);
                            }}
                        />
                        <InfoCard 
                            title="Download Report (XLS)"
                            description="Download the report in XLS format for data analysis."
                            iconName="table-chart"
                            iconBackgroundColor="#2196F3"
                            borderColor="#1976D2"
                            titleColor="#1976D2"
                            onPress={() => {
                                setSelectedReportType('xls');
                                setStep(1);
                            }}
                        />
                    </View>
                </ScrollView>
            )}
            {step === 1 && (
                <View style={{ backgroundColor: '#fff', paddingTop: '10%', height: '100%' }}>
                    <Text style={[styles.largeText, { textAlign: 'center' }]}>Select Farm</Text>
                    <Picker
                        selectedValue={selectedFarmId}
                        onValueChange={(itemValue) => setSelectedFarmId(itemValue)}
                        style={styles.picker}
                    >
                        {farms.map(farm => (
                            <Picker.Item key={farm.id} label={farm.name} value={farm.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity 
                        style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#62C962', alignSelf: 'center' }]} 
                        onPress={handleGenerateReport}
                        disabled={!selectedFarmId}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#555', alignSelf: 'center' }]} 
                        onPress={() => setStep(0)}
                    >
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff' }}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const reportStyles = StyleSheet.create({
    categoryContainer: {
        marginBottom: '5%',
    },
    categoryTitle: {
        fontSize: 24,
        padding: '1%',
        fontWeight: 'bold',
        marginVertical: '3%',
        textAlign: 'center'
    },
});

export default ReportsScreen;
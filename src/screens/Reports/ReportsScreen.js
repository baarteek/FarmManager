import { ScrollView, StyleSheet, Text, View } from "react-native";
import InfoCard from "../../components/InfoCard";
import { styles } from '../../styles/AppStyles';
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useFarmContext } from "../../context/FarmProvider";
import { TouchableOpacity } from "react-native";
import { useReportsContext } from "../../context/ReportsProvider";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { useNavigation } from "@react-navigation/native";

const ReportsScreen = () => {
    const  navigation = useNavigation();
    const {farms, fetchFarmsNamesAndId, loading: farmsLoading, error: farmsError, setError: setFarmsError} = useFarmContext();
    const {data, loading: reportsLoading, error: reportsError, setError: setReportsError, fetchAgrotechnicalActivitiesReport} = useReportsContext();
    const [step, setStep] = useState(0);
    const [selectedFarmId, setSelectedFarmId] = useState('');

    useEffect(() => {
        fetchFarmsNamesAndId();
    }, []);

    const handleFetchFarms = async () => {
        if (selectedFarmId === '' || selectedFarmId === null) {
            setStep(0);
            return;
        }
        try {
            const data = await fetchAgrotechnicalActivitiesReport(selectedFarmId);
            if(data === null) {
                setStep(0);
                return;
            }
            navigation.navigate('ViewReport', { htmlContent: data });
        } catch (error) {
            console.error('Report error:', error);
        } finally {
            setStep(0);
        }
    };
    

    if(farmsLoading || reportsLoading) {
        return <LoadingView  />
    }

    if(farmsError || reportsError) {
        const err = farmsError|| '' + reportsError || '';
        return (
            <>
                <ErrorView message={err}/>
                <TouchableOpacity 
                    style={[styles.button, { margin: '5%', width: '80%', backgroundColor: '#555', alignSelf: 'center' }]} 
                    onPress={() => {
                        setFarmsError(null);
                        setReportsError(null);
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
                                onPress={() => setStep(1)}
                            />

                            <InfoCard 
                                title="Download Report (PDF)"
                                description="Download the report in PDF format for easy sharing and printing."
                                iconName="picture-as-pdf"
                                iconBackgroundColor="#FF5722"
                                borderColor="#E64A19"
                                titleColor="#E64A19"
                                onPress={() => setStep(1)}
                            />

                            <InfoCard 
                                title="Download Report (XLS)"
                                description="Download the report in XLS format for data analysis."
                                iconName="table-chart"
                                iconBackgroundColor="#2196F3"
                                borderColor="#1976D2"
                                titleColor="#1976D2"
                                onPress={() => setStep(1)}
                            />
                        </View>
                    </ScrollView>
                )}
                {step === 1 && (
                    <View style={{backgroundColor: '#fff', paddingTop: '10%', height: '100%'}}>
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
                                onPress={handleFetchFarms}
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

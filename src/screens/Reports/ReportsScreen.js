import { ScrollView, StyleSheet, Text, View } from "react-native";
import InfoCard from "../../components/InfoCard";
import { styles } from '../../styles/AppStyles';

const ReportsScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView style={{ backgroundColor: '#fff', height: '100%', paddingTop: '5%' }} showsVerticalScrollIndicator={false}>
                <View style={reportStyles.categoryContainer}>
                    <Text style={[reportStyles.categoryTitle, { color: '#666' }]}>List of Agrotechnical Activities</Text>                    
                    <InfoCard 
                        title="Generate Report"
                        description="Generate a comprehensive overview report."
                        iconName="assessment"
                        iconBackgroundColor="#4CAF50"
                        borderColor="#388E3C"
                        titleColor="#388E3C"
                        onPress={() => console.log("Generate Report")}
                    />

                    <InfoCard 
                        title="Download Report (PDF)"
                        description="Download the report in PDF format for easy sharing and printing."
                        iconName="picture-as-pdf"
                        iconBackgroundColor="#FF5722"
                        borderColor="#E64A19"
                        titleColor="#E64A19"
                        onPress={() => console.log("Download PDF Report")}
                    />

                    <InfoCard 
                        title="Download Report (XLS)"
                        description="Download the report in XLS format for data analysis."
                        iconName="table-chart"
                        iconBackgroundColor="#2196F3"
                        borderColor="#1976D2"
                        titleColor="#1976D2"
                        onPress={() => console.log("Download XLS Report")}
                    />
                </View>
            </ScrollView>
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

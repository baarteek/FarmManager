import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const AgrotechnicalInterventionList = ({ selectedOption, setSelectedOption }) => {
    const { token } = useAuth();
    const [agrotechnicalInterventions, setAgrotechnicalInterventions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAgrotechnicalInterventionInfo();
    }, []);

    const fetchAgrotechnicalInterventionInfo = async () => {
        setLoading(true);
        try {
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.get(`${API_BASE_URL}/AgrotechnicalInterventions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAgrotechnicalInterventions(response.data);
            setError(null);
        } catch (err) {
            console.log('Error fetching agrotechnical interventions: ', err.message);
            setError("Failed to load Agrotechnical Interventions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingView title="Loading data..." />;
    }

    if (error) {
        return <ErrorView message={error} />;
    }

    const selectedOptionInfo = agrotechnicalInterventions.find(
        (option) => option.value === selectedOption
    );

    const renderOption = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.optionContainer,
                selectedOption === item.value && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(item.value)}
        >
            <Text style={styles.optionName}>{item.name}</Text>
            <Text style={styles.optionDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Selection of agrotechnical intervention</Text>
            <FlatList
                data={agrotechnicalInterventions}
                keyExtractor={(item) => item.value.toString()}
                renderItem={renderOption}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        alignSelf: 'center',
        padding: '3%',
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '3%',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: '5%',
    },
    optionContainer: {
        padding: '3%',
        marginVertical: '3%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
    },
    selectedOption: {
        backgroundColor: '#e0f7fa',
        borderColor: '#00796b',
    },
    optionName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: '3%',
    },
});

export default AgrotechnicalInterventionList;

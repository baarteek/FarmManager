import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const agrotechnicalInterventionsList = [
    { value: "None", name: "Brak wybranej wartości", description: "" },
    { value: "PRSK1420", name: "Działanie rolno-środowiskowo-klimatyczne PROW 2014-2020", description: "" },
    { value: "RE1420", name: "Rolnictwo ekologiczne PROW 2014-2020", description: "" },
    { value: "ZRSK2327", name: "Płatności rolno-środowiskowo-klimatyczne WPR PS", description: "" },
    { value: "RE2327", name: "Rolnictwo ekologiczne WPR PS", description: "" },
    { value: "E_MPW", name: "Międzyplony ozime lub wsiewki śródplonowe", description: "" },
    { value: "E_OPN", name: "Opracowanie i przestrzeganie planu nawożenia: wariant podstawowy lub wariant z wapnowaniem", description: "" },
    { value: "E_USU", name: "Uproszczone systemy uprawy", description: "" },
    { value: "E_WSG", name: "Wymieszanie słomy z glebą", description: "" },
    { value: "E_BOU", name: "Biologiczna ochrona upraw", description: "" }
];

const AgrotechnicalInterventionList = ({ selectedOption, setSelectedOption }) => {
    const [agrotechnicalInterventions, setAgrotechnicalInterventions] = useState([]);

    useEffect(() => {
        setAgrotechnicalInterventions(agrotechnicalInterventionsList);
    }, []);

    const renderOption = (item) => (
        <TouchableOpacity
            key={item.value}
            style={[
                styles.optionContainer,
                selectedOption === item.value && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(item.value)}
        >
            <Text style={styles.optionName}>{item.name}</Text>
            {item.description ? <Text style={styles.optionDescription}>{item.description}</Text> : null}
        </TouchableOpacity>
    );

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>Wybór interwencji agrotechnicznej</Text>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {agrotechnicalInterventions.map(renderOption)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: "90%",
        alignSelf: "center",
        padding: "3%",
        backgroundColor: "#fff",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: "3%",
        textAlign: "center",
    },
    listContainer: {
        paddingBottom: "5%",
    },
    optionContainer: {
        padding: "3%",
        marginVertical: "3%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
    },
    selectedOption: {
        backgroundColor: "#e0f7fa",
        borderColor: "#00796b",
    },
    optionName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    optionDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: "3%",
    },
});

export default AgrotechnicalInterventionList;
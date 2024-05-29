import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/AppStyles";
import { useState } from "react";
import FieldDetails from "../components/FieldDetails";

const initialData = [
    {
        id: 1, 
        name: 'Field 1', 
        area: 2.5,
        soilType: 'Loamy',
        isActive: true,
        plotNumbers: [
            '062012_2.0010.AR_1.242',
            '062012_2.0010.AR_1.243',
            '062012_2.0010.AR_1.244'
        ],
        crops: [
            {
                id: 1, 
                cropType: 'Wheat',
                sowingDate: '15.05.2023',
                harvestDate: '15.09.2023',
                season: '2023/2024',
                fertilizationHistory: [
                    {
                        date: '2023-05-10',
                        type: 'NPK',
                        quantity: '50 kg/ha',
                        method: 'Broadcast',
                        description: 'Improved growth observed after 2 weeks'
                    },
                    {
                        date: '2023-06-15',
                        type: 'Urea',
                        quantity: '30 kg/ha',
                        method: 'Foliar application',
                        description: 'Greener leaves, better tillering'
                    }
                ],
                pestAndDiseaseHistory: [
                    {
                        date: '2023-06-01',
                        type: 'Aphids',
                        treatment: 'Insecticide spray',
                        description: 'Aphids infestation noticed on lower leaves',
                    },
                    {
                        date: '2023-07-10',
                        type: 'Fungal Disease',
                        treatment: 'Fungicide application',
                        description: 'Powdery mildew on leaves',
                    }
                ]
            }
        ],
        soilMeasurements: [
            {
                date: '2023-03-01',
                pH: 6.8,
                nitrogen: 'Low',
                phosphorus: 'Medium',
                potassium: 'High',
            },
            {
                date: '2023-02-01',
                pH: 6.4,
                nitrogen: 'Medium',
                phosphorus: 'Medium',
                potassium: 'High',
            },
        ]
    },
    {
        id: 1, 
        name: 'Field 1', 
        area: 2.5,
        soilType: 'Loamy',
        isActive: true,
        plotNumbers: [
            '062012_2.0010.AR_1.242',
            '062012_2.0010.AR_1.243',
            '062012_2.0010.AR_1.244'
        ],
        crops: [
            {
                id: 2, 
                cropType: 'Wheat',
                sowingDate: '15.05.2023',
                harvestDate: '15.09.2023',
                season: '2023/2024',
                fertilizationHistory: [
                    {
                        date: '2023-05-10',
                        type: 'NPK',
                        quantity: '50 kg/ha',
                        method: 'Broadcast',
                        description: 'Improved growth observed after 2 weeks'
                    },
                    {
                        date: '2023-06-15',
                        type: 'Urea',
                        quantity: '30 kg/ha',
                        method: 'Foliar application',
                        description: 'Greener leaves, better tillering'
                    }
                ],
                pestAndDiseaseHistory: [
                    {
                        date: '2023-06-01',
                        type: 'Aphids',
                        treatment: 'Insecticide spray',
                        description: 'Aphids infestation noticed on lower leaves',
                    },
                    {
                        date: '2023-07-10',
                        type: 'Fungal Disease',
                        treatment: 'Fungicide application',
                        description: 'Powdery mildew on leaves',
                    }
                ]
            }
        ],
        soilMeasurements: [
            {
                date: '2023-03-01',
                pH: 6.8,
                nitrogen: 'Low',
                phosphorus: 'Medium',
                potassium: 'High',
            },
            {
                date: '2023-02-01',
                pH: 6.4,
                nitrogen: 'Medium',
                phosphorus: 'Medium',
                potassium: 'High',
            },
        ]
    }
];

const FieldManagementScreen = () => {
    const [fields, setFields] = useState(initialData);

    const handleDelete = (id) => {
        const updatedData = fields.filter(field => field.id !== id);
        setFields(updatedData);
    };

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
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, {margin: '5%', width: '80%', backgroundColor: '#62C962'}]}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%'}}>Add New Field</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.mainCantainer}>
                {
                    fields.map((field, index) => (
                        <FieldDetails fieldData={field} key={index} onDelete={confirmDelete} />
                    ))
                }
            </ScrollView>
        </View>
        );
};

export default FieldManagementScreen;
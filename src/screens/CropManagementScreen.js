import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/AppStyles";
import CropDetails from "../components/CropDetails";
import { useState } from "react";

const initialData = [
    {
        id: 1,
        name: 'Crop 1',
        cropType: 'Wheat',
        growthStage: 'Flowering',
        sowingDate: 'April 15th, 2023',
        history: [
            {
                id: 1,
                date: 'May 10th, 2023',
                description: 'Fertilized with NPK'
            },
            {
                id: 2,
                date: 'June 5th, 2023',
                description: 'Treated for pests',
            }
        ],
        details: {
            area: 12.5,
            soilType: 'Loamy',
            previousCrops: ['Corn', 'Barley'],
            soilPH: 6.8,
            soilTests: [
                { testType: 'Nitrogen', value: 'Low', date: 'March 2023' },
                { testType: 'Phosphorus', value: 'Medium', date: 'March 2023' }
            ],
            referencePlotNumbers: ['062012_2.0010.AR_1.242', '062012_2.0010.AR_1.243', '062012_2.0010.AR_1.24']
        }
    },
    {
        id: 2,
        name: 'Crop 2',
        cropType: 'Corn',
        growthStage: 'Maturity',
        sowingDate: 'March 20th, 2023',
        history: [
            {
                id: 3,
                date: 'April 25th, 2023',
                description: 'Irrigated'
            },
            {
                id: 4,
                date: 'May 20th, 2023',
                description: 'Fertilized with urea',
            }
        ],
        details: {
            area: 20,
            soilType: 'Sandy',
            previousCrops: ['Soybeans', 'Wheat'],
            soilPH: 7.2,
            soilTests: [
                { testType: 'Potassium', value: 'High', date: 'February 2023' }
            ],
            referencePlotNumbers: ['062015_3.0020.AR_2.345', '062015_3.0020.AR_2.346']
        }
    },
    {
        id: 3,
        name: 'Crop 3',
        cropType: 'Soybeans',
        growthStage: 'Pod Development',
        sowingDate: 'May 1st, 2023',
        history: [
            {
                id: 5,
                date: 'June 10th, 2023',
                description: 'Applied pesticides'
            },
            {
                id: 6,
                date: 'July 15th, 2023',
                description: 'Top dressed with nitrogen',
            }
        ],
        details: {
            area: 15,
            soilType: 'Clay',
            previousCrops: ['Corn', 'Canola'],
            soilPH: 5.5,
            soilTests: [
                { testType: 'Organic Matter', value: 'Moderate', date: 'January 2023' }
            ],
            referencePlotNumbers: ['062017_5.0030.AR_3.789', '062017_5.0030.AR_3.790']
        }
    }
];


const CropManagementScreen = () => {
    const [data, setData] = useState(initialData);

    const handleDelete = (id) => {
        const updatedData = data.filter(field => field.id !== id);
        setData(updatedData);
    };

    const confirmDelete = (id) => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this crop?",
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
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22, color: '#fff', marginLeft: '10%', marginRight: '10%'}}>Add New Crop</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.mainCantainer}>
                {
                    data.map((field, index) => (
                        <CropDetails cropData={field} key={index} onDelete={confirmDelete} />
                    ))
                }
            </ScrollView>
        </View>
        );
};

export default CropManagementScreen;
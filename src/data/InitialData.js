
export const initialData = [
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
        id: 2, 
        name: 'Field 2', 
        area: 2.9,
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
    }
];

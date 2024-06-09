
export const initialData = [
    {
        id: 1, 
        name: 'Field 1', 
        area: 2.5,
        soilType: 'Loamy',
        plotNumbers: [
            '062012_2.0010.AR_1.242',
            '062012_2.0010.AR_1.243',
            '062012_2.0010.AR_1.244'
        ],
        crops: [
            
        ],
        soilMeasurements: [
            {
                date: '11.03.2023',
                pH: 6.8,
                nitrogen: 'Low',
                phosphorus: 'Medium',
                potassium: 'High',
            },
            {
                date: '16.07.2024',
                pH: 6.9,
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
                        date: '15.05.2023',
                        type: 'NPK',
                        quantity: '50 kg/ha',
                        method: 'Broadcast',
                        description: 'Improved growth observed after 2 weeks'
                    },
                    {
                        date: '15.05.2023',
                        type: 'Urea',
                        quantity: '30 kg/ha',
                        method: 'Foliar application',
                        description: 'Greener leaves, better tillering'
                    }
                ],
                pestAndDiseaseHistory: [
                    {
                        date: '15.05.2023',
                        type: 'Aphids',
                        treatment: 'Insecticide spray',
                        description: 'Aphids infestation noticed on lower leaves',
                    },
                    {
                        date: '15.05.2023',
                        type: 'Fungal Disease',
                        treatment: 'Fungicide application',
                        description: 'Powdery mildew on leaves',
                    }
                ]
            }
        ],
        soilMeasurements: [
            {
                date: '03.01.2023',
                pH: 6.8,
                nitrogen: 'Low',
                phosphorus: 'Medium',
                potassium: 'High',
            },
            {
                date: '02.01.2022',
                pH: 6.4,
                nitrogen: 'Medium',
                phosphorus: 'Medium',
                potassium: 'High',
            },
        ]
    }
];

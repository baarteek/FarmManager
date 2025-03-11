import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const fertilizationTypeList = [
    { id: 0, name: "Nie wybrano" },
    { id: 1, name: "Organiczne" },
    { id: 2, name: "Nieorganiczne" },
    { id: 3, name: "O przedłużonym uwalnianiu" },
    { id: 4, name: "Płynne" },
    { id: 5, name: "Granulowane" },
    { id: 6, name: "Dolistne" },
    { id: 7, name: "Hydroponiczne" },
    { id: 8, name: "Kontrolowanego uwalniania" },
    { id: 9, name: "Bio-nawóz" },
    { id: 10, name: "Obornik" },
    { id: 11, name: "Kompost" },
    { id: 12, name: "Zielony nawóz" },
    { id: 13, name: "Inne" }
];

const FertilizationTypePicker = ({ selectedFertilizationType, setSelectedFertilizationType }) => {
    const [fertilizationTypes, setFertilizationTypes] = useState([]);

    useEffect(() => {
        setFertilizationTypes(fertilizationTypeList);
        setSelectedFertilizationType(fertilizationTypeList[0].id);
    }, []);

    return (
        <View>
            <Picker
                selectedValue={selectedFertilizationType}
                onValueChange={(itemValue) => setSelectedFertilizationType(itemValue)}
            >
                {fertilizationTypes.map(fertilizationType => (
                    <Picker.Item key={fertilizationType.id} label={fertilizationType.name} value={fertilizationType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default FertilizationTypePicker;
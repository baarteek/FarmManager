import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const plantProtectionTypeList = [
    { id: 0, name: "Nie wybrano" },
    { id: 1, name: "Herbicyd" },
    { id: 2, name: "Insektycyd" },
    { id: 3, name: "Fungicyd" },
    { id: 4, name: "Rodentycyd" },
    { id: 5, name: "Nematicyd" },
    { id: 6, name: "Molluskocyd" },
    { id: 7, name: "Bakteriocyd" },
    { id: 8, name: "Wirusocyd" },
    { id: 9, name: "Akarcyd" },
    { id: 10, name: "Regulator wzrostu" },
    { id: 11, name: "Repelent" },
    { id: 12, name: "Desykant" },
    { id: 13, name: "Inne" }
];

const PlantProtectionTypePicker = ({ selectedPlantProtectionType, setSelectedPlantProtectionType }) => {
    const [plantProtectionTypes, setPlantProtectionTypes] = useState([]);

    useEffect(() => {
        setPlantProtectionTypes(plantProtectionTypeList);
        setSelectedPlantProtectionType(plantProtectionTypeList[0].id);
    }, []);

    return (
        <View>
            <Picker
                selectedValue={selectedPlantProtectionType}
                onValueChange={(itemValue) => setSelectedPlantProtectionType(itemValue)}
            >
                {plantProtectionTypes.map(plantProtectionType => (
                    <Picker.Item key={plantProtectionType.id} label={plantProtectionType.name} value={plantProtectionType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default PlantProtectionTypePicker;
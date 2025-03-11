import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const soilTypeList = [
    { id: 0, name: "Nie wybrano" },
    { id: 1, name: "Gleba brunatna" },
    { id: 2, name: "Czarnoziem" },
    { id: 3, name: "Gleba bielicowa" },
    { id: 4, name: "Gleba płowa" },
    { id: 5, name: "Torf" },
    { id: 6, name: "Histosol" },
    { id: 7, name: "Mady rzeczne" },
    { id: 8, name: "Rędzina" },
    { id: 9, name: "Less" },
    { id: 10, name: "Gleba gliniasta" },
    { id: 11, name: "Gleba piaszczysta" },
    { id: 12, name: "Inne" }
];

const SoilTypePicker = ({ selectedSoilType, setSelectedSoilType }) => {
    const [soilTypes, setSoilTypes] = useState([]);

    useEffect(() => {
        setSoilTypes(soilTypeList);
        setSelectedSoilType(soilTypeList[0].id);
    }, []);

    return (
        <View>
            <Picker
                selectedValue={selectedSoilType}
                onValueChange={(itemValue) => setSelectedSoilType(itemValue)}
            >
                {soilTypes.map(soilType => (
                    <Picker.Item key={soilType.id} label={soilType.name} value={soilType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default SoilTypePicker;
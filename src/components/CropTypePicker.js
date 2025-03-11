import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const cropTypeList = [
    { id: 0, name: "Nie wybrano" },
    { id: 1, name: "Zboże" },
    { id: 2, name: "Warzywo" },
    { id: 3, name: "Owoc" },
    { id: 4, name: "Roślina strączkowa" },
    { id: 5, name: "Roślina oleista" },
    { id: 6, name: "Roślina korzeniowa" },
    { id: 7, name: "Roślina bulwiasta" },
    { id: 8, name: "Roślina pastewna" },
    { id: 9, name: "Roślina włóknista" },
    { id: 10, name: "Przyprawa" },
    { id: 11, name: "Roślina lecznicza" },
    { id: 12, name: "Roślina ozdobna" },
    { id: 13, name: "Inne" }
];

const CropTypePicker = ({ selectedCropType, setSelectedCropType }) => {
    const [cropTypes, setCropTypes] = useState([]);

    useEffect(() => {
        setCropTypes(cropTypeList);
        setSelectedCropType(cropTypeList[0].id);
    }, []);

    return (
        <View>
            <Picker
                selectedValue={selectedCropType}
                onValueChange={(itemValue) => setSelectedCropType(itemValue)}
            >
                {cropTypes.map(cropType => (
                    <Picker.Item key={cropType.id} label={cropType.name} value={cropType.id} />
                ))}
            </Picker>
        </View>
    );
};

export default CropTypePicker;
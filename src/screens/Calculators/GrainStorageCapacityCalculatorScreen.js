import React, { useState } from 'react';
import CalculatorLayout from '../../components/CalculatorLayout';
import CalculatorTitle from '../../components/CalculatorTitle';
import InputField from '../../components/InputField';
import CalculateButton from '../../components/CalculateButton';
import ResultDisplay from '../../components/ResultDisplay';
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { calculatorStyles } from '../../styles/CalculatorStyles';
import { formatDecimalInput } from '../../utils/TextUtils';

const grainDensityData = {
  wheat: 770,
  corn: 720,
  barley: 620,
  oats: 420,
  rye: 710,
  sorghum: 800,
  rice: 590,
  millet: 720,
  soybean: 750,
  rapeseed: 680, 
  sunflower: 410,
  buckwheat: 650,
  flaxseed: 640,
  chickpea: 820,
  peas: 780,
  beans: 750,
};


const grainTypes = Object.keys(grainDensityData);

const GrainStorageCapacityCalculatorScreen = () => {
  const [storageVolume, setStorageVolume] = useState('');
  const [grainType, setGrainType] = useState('wheat');
  const [result, setResult] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalculate = () => {
    const storageVolumeNum = formatDecimalInput(storageVolume);

    if (isNaN(storageVolumeNum) || storageVolumeNum <= 0) {
      alert('Please enter a valid storage volume in cubic meters.');
      return;
    }

    const grainDensity = grainDensityData[grainType];
    const storageCapacityTons = (storageVolumeNum * grainDensity) / 1000;
    setResult(storageCapacityTons.toFixed(2));
  };

  const handleStorageVolumeChange = (value) => {
    setStorageVolume(value);
    setResult(null);
  };

  const handleGrainTypeSelect = (type) => {
    setGrainType(type);
    setModalVisible(false);
    setResult(null);
  };

  return (
    <CalculatorLayout>
      <CalculatorTitle 
        title="Grain Storage Capacity Calculator"
        description="Calculate how much grain (in tons) can be stored in a given storage capacity based on the grain type and volume in cubic meters."
      />

      <View style={calculatorStyles.contentContainer}>
        <View style={{ marginBottom: 20 }}>
          <Text style={calculatorStyles.label}>Select Grain Type:</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>{grainType.charAt(0).toUpperCase() + grainType.slice(1)}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={grainTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleGrainTypeSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <InputField 
          label="Storage Volume (m³):" 
          value={storageVolume} 
          onChangeText={handleStorageVolumeChange} 
          placeholder="Enter storage volume in cubic meters" 
        />

        <CalculateButton onPress={handleCalculate} />

        {result !== null && (
          <ResultDisplay 
            result={result} 
            label="Storage Capacity" 
            icon="warehouse" 
            iconColor="#7B1FA2" 
            unit='tons'
          />
        )}
      </View>
    </CalculatorLayout>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    marginVertical: '15%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default GrainStorageCapacityCalculatorScreen;

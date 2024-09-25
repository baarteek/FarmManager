import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FieldDetailsModal = ({ isVisible, onClose, field }) => {
  const navigation = useNavigation();

  if (!field) return null;

  const navigateToSoilMeasurements = () => {
    isVisible && onClose();
    navigation.navigate('Add Soil Measurement', { fieldId: field.fieldId });
  };

  const navigateToFertilization = () => {
    isVisible && onClose();
    navigation.navigate('Add Fertilization', { fieldId: field.cropId });
  };

  const navigateToPlantProtections = () => {
    isVisible && onClose();
    navigation.navigate('Add Plant Protection', { cropId: field.cropId });
  };

  const navigateToCropDetails = () => {
    isVisible && onClose();
    navigation.navigate('Crop Details', { cropId: field.cropId });
  };

  const navigateToFieldDetails = () => {
    isVisible && onClose();
    navigation.navigate('Field Details', { fieldId: field.fieldId });
  };

  const navigateToCultivationOperations = () => {
    isVisible && onClose();
    navigation.navigate('Add Cultivation Operation', { cropId: field.cropId });
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.fieldName}>{field.fieldName}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Area:</Text>
            <Text style={styles.infoValue}>{field.area} ha</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Crop:</Text>
            <Text style={styles.infoValue}>{field.cropName}</Text>
          </View>

          <View style={styles.separator} />

          <TouchableOpacity style={[styles.actionButton, styles.fieldDetailsButton]} onPress={navigateToFieldDetails}>
            <Icon name="map" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Field Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.cropDetailsButton]} onPress={navigateToCropDetails}>
            <Icon name="sprout" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Crop Details</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={[styles.actionButton, styles.soilButton]} onPress={navigateToSoilMeasurements}>
            <Icon name="flask" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Add Soil Measurements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.cultivationOperationButton]} onPress={navigateToCultivationOperations}>
            <Icon name="tractor" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Add Cultivation Operation</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.fertilizationButton]} onPress={navigateToFertilization}>
            <Icon name="leaf" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Add Fertilization</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.plantProtectionButton]} onPress={navigateToPlantProtections}>
            <Icon name="shield" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Add Plant Protections</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  fieldName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '3%',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  cropDetailsButton: {
    backgroundColor: '#4CAF50',
  },
  fieldDetailsButton: {
    backgroundColor: '#795548',
  },
  soilButton: {
    backgroundColor: '#FF9800', 
  },
  cultivationOperationButton: {
    backgroundColor: '#2196F3',
  },
  fertilizationButton: {
    backgroundColor: '#FFC107',
  },
  plantProtectionButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: '3%',
  },
  icon: {
    marginRight: '3%',
  },
  closeButton: {
    marginTop: '5%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#E0E0E0',
    marginVertical: '4%',
  },
});

export default FieldDetailsModal;

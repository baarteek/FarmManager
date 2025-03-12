import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FieldDetailsModal = ({ isVisible, onClose, field }) => {
  const navigation = useNavigation();

  if (!field) return null;

  const activeCrop = field.crops?.find(crop => crop.isActive) || null;

  const navigateToSoilMeasurements = () => {
    isVisible && onClose();
    navigation.navigate('Dodaj Pomiary Gleby', { fieldId: field.id });
  };

  const navigateToFertilization = () => {
    isVisible && onClose();
    if (activeCrop) {
      navigation.navigate('Dodaj Nawożenie', { cropId: activeCrop.id });
    }
  };

  const navigateToPlantProtections = () => {
    isVisible && onClose();
    if (activeCrop) {
      navigation.navigate('Dodaj Ochronę Roślin', { cropId: activeCrop.id});
    }
  };

  const navigateToCropDetails = () => {
    isVisible && onClose();
    if (activeCrop) {
      navigation.navigate('Szczegóły Uprawy', { cropId: activeCrop.id });
    }
  };

  const navigateToFieldDetails = () => {
    isVisible && onClose();
    navigation.navigate('Szczegóły Pola', { fieldId: field.id });
  };

  const navigateToCultivationOperations = () => {
    isVisible && onClose();
    if (activeCrop) {
      navigation.navigate('Dodaj Operację Uprawową', { cropId: activeCrop.id });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.fieldName}>{field.name}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Powierzchnia:</Text>
            <Text style={styles.infoValue}>{field.area} ha</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Uprawa:</Text>
            <Text style={styles.infoValue}>{activeCrop ? activeCrop.name : 'Brak uprawy'}</Text>
          </View>

          <View style={styles.separator} />

          <TouchableOpacity style={[styles.actionButton, styles.fieldDetailsButton]} onPress={navigateToFieldDetails}>
            <Icon name="map" size={20} color="white" style={styles.icon} />
            <Text style={styles.actionButtonText}>Szczegóły pola</Text>
          </TouchableOpacity>

          {activeCrop && (
            <>
              <TouchableOpacity style={[styles.actionButton, styles.cropDetailsButton]} onPress={navigateToCropDetails}>
                <Icon name="sprout" size={20} color="white" style={styles.icon} />
                <Text style={styles.actionButtonText}>Szczegóły uprawy</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity style={[styles.actionButton, styles.soilButton]} onPress={navigateToSoilMeasurements}>
                <Icon name="flask" size={20} color="white" style={styles.icon} />
                <Text style={styles.actionButtonText}>Dodaj pomiary gleby</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.cultivationOperationButton]} onPress={navigateToCultivationOperations}>
                <Icon name="tractor" size={20} color="white" style={styles.icon} />
                <Text style={styles.actionButtonText}>Dodaj operację uprawową</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.fertilizationButton]} onPress={navigateToFertilization}>
                <Icon name="leaf" size={20} color="white" style={styles.icon} />
                <Text style={styles.actionButtonText}>Dodaj nawożenie</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.plantProtectionButton]} onPress={navigateToPlantProtections}>
                <Icon name="shield" size={20} color="white" style={styles.icon} />
                <Text style={styles.actionButtonText}>Dodaj ochronę roślin</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.separator} />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Zamknij</Text>
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
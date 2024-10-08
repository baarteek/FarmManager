import React from 'react';
import { Modal, View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectionModal = ({ isVisible, data, onSelectItem, onClose, title, keyExtractor, renderItem }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          
          <FlatList
            data={data}
            keyExtractor={keyExtractor} 
            renderItem={renderItem || (({ item }) => (
              <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.listItemContainer}>
                <Text style={styles.listItem}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          />
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={20} color="white" />
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: '5%',
    color: '#333',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  listItem: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9E9E9E',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default SelectionModal;

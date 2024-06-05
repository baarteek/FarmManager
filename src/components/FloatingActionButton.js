import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FloatingActionButton = ({ onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.fab} 
            onPress={onPress}
        >
            <Icon name="add" size={38} color="#fff" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: '10%',
        bottom: '10%',
        width: 60,
        height: 60,
        backgroundColor: 'rgba(98, 201, 98, 0.6)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    }
});

export default FloatingActionButton;

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InfoCard = ({ title, description, iconName, iconBackgroundColor, borderColor, titleColor, onPress }) => {
    return (
        <TouchableOpacity style={[styles.card, { borderColor }]} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                <Icon name={iconName} size={40} color="#fff" />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        padding: '5%',
        margin: '2%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '5%',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    description: {
        fontSize: 16,
        color: '#5f6368',
    },
});

export default InfoCard;

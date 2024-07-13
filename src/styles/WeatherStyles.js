import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const weatherStyles = StyleSheet.create({
    title: {
        color: '#005f73', 
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2%',
    },
    container: {
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
        padding: '4%',
        marginBottom: '2%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    innerContainer: {
        backgroundColor: '#b2ebf2',
        borderRadius: 10,
        padding: '5%',
        marginBottom: '2%',
        borderColor: '#81d4fa',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
        overflow: 'hidden',
    },
    gradientBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    largeText: {
        color: '#005f73', 
        fontSize: 18,
        fontWeight: '500',
    },
    subtitle: {
        color: '#005f73', 
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2%',
    },
    iconColor: '#0288d1',
    iconSize: 26,
    line: {
        height: 1,
        width: "95%",
        borderWidth: 1,
        borderColor: '#81d4fa',
        borderStyle: 'solid',
        marginTop: '3%',
        marginBottom: '3%'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1%',
    },
});

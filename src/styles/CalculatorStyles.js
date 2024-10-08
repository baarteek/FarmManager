import { StyleSheet } from 'react-native';

export const calculatorStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        padding: '5%',
        alignItems: 'center',
        elevation: 5,
    },
    contentContainer: {
        width: '98%',
        padding: '5%',
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
        border: '1px solid',
        borderWidth: 2,
        backgroundColor:'#FFFFFF',
    },
    inputContainer: {
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        width: '100%',
        padding: '5%',
        borderRadius: 12,
        marginBottom: '5%',
    },
    input: {
        width: '85%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#d1d9e6',
        marginTop: '2%',
        marginBottom: '5%',
        paddingLeft: 15,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#ffffff',
    },
    button: {
        borderWidth: 0,
        borderRadius: 24,
        justifyContent: 'center',
        backgroundColor: '#1f78b4',
        padding: '5%',
        alignItems: 'center',
        marginTop: '5%',
        width: '70%',
        elevation: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    resultContainer: {
        alignItems: 'center', 
        justifyContent: 'center',  
        marginTop: '5%',
        padding: '5%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        elevation: 4,
        width: '90%',
    },
    resultIcon: {
        marginBottom: '3%',
    },
    resultText: {
        color: '#2c3e50',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: '3%',
    },
    resultValueContainer: {
        alignItems: 'center',
    },
    resultValue: {
        color: '#1f78b4',
        fontSize: 24,
        fontWeight: 'bold',
    },
    resultUnit: {
        color: '#1f78b4',
        fontSize: 18,
    },
    unitSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 10,
        marginBottom: 20,
    },
    unitButton: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#1f78b4',
        padding: '4%',
        backgroundColor: '#e8f1fa',
        marginHorizontal: '1%',
    },
    unitButtonText: {
        color: '#1f78b4',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        color: '#2c3e50',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '3%',
        textAlign: 'center',
    },
    description: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: '3%',
    },
    infoText: {
        color: '#22532A',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: '5%',
    },
});

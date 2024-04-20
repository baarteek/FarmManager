import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    mainCantainer: {
        felx: 1, 
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    container: {
        alignItems:'center', 
        justifyContent: 'flex-start',
    },
    topContainer: {
        backgroundColor: '#DFF6DF',
        marginTop: '5%',
        marginBottom: "1%",
        width: '90%',
        padding: '2%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomContainer: {
        backgroundColor: '#DFF6DF',
        width: '90%',
        padding: '5%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    loadingContainer: {
        backgroundColor: '#DFF6DF',
        width: '90%',
        padding: '5%',
        margin: '5%',
        borderRadius: 20,
        justifyContent: 'center',
        textAlign: 'center'
    },
    content: {

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#22532A',
        fontSize: 18,
    },
    text: {
        color: '#22532A',
        fontSize: 14,
        fontWeight: '500'
    }
});
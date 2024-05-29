import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
    mainCantainer: {
        felx: 1, 
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        paddingBottom: '10%'
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
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    bottomContainer: {
        backgroundColor: '#DFF6DF',
        width: '90%',
        padding: '5%',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    innerContainer: {
        alignItems: 'center',
        backgroundColor: '#BAF1BA',
        width: '100%',
        padding: '5%',
        borderRadius: 16,
        marginBottom: '1%',
        marginTop: '1%',
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
    rowContainer: {
        flexDirection: 'row',
    },
    infoRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    horizontalContainer: {
        width: 100,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#22532A',
        fontSize: 18,
    },
    subtitle: {
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: '#22734D',
        fontSize: 20,
        marginBottom: '2%'
    },
    text: {
        color: '#22532A',
        fontSize: 18,
        fontWeight: '500'
    },
    textInfo: {
        color: '#22532A',
        fontSize: 18,
        fontWeight: '300'
    },
    largeText: {
        color: '#22532A',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: '2%',
        marginRight: '5%'
    },
    line:  {
        height: 2, 
        width: "100%",
        borderWidth: 1, 
        borderColor: '#fff', 
        borderStyle: 'solid',
        marginBottom: '2%',
        marginTop: '2%'
    },
    warningText: {
        color: '#5F7262',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    button: {
        borderWidth: 1,
        borderRadius: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: 'auto',
        padding: '1%'
    },
    warningBackgorundColor: '#FCE699',
    warningTitleColor: '#4B534C',
});
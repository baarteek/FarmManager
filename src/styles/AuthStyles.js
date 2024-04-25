import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    innerContainer: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    infoContainer: {
        margin: '5%',
        padding: '5%',
        marginTop: '10%',
        marginBottom: '10%',
        backgroundColor: '#DFF6DF',
        borderWidth: 1,
        borderColor: '#22532A',
        borderRadius: 20,
        color: '#22532A',
    },
    title: {
        color: '#22532A',
        fontSize: 42,
        fontWeight: 'bold'
    },
    slogan: {
        color: '#3A8C38',
        fontSize: 15,
        marginBottom: '20%'
    },
    input: {
        width: '85%',
        height: '8%',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#D4D4D4',
        marginTop: '5%',
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    forgotPasswordTouchableOpacity: {
        marginTop: '1%',
        alignSelf: 'flex-end',
        marginRight: '12%'
    },
    loginButton: {
        marginTop: '25%',
        width: '85%',
        height: '7%',
        backgroundColor: '#00E000',
        borderRadius: 50,
        justifyContent: 'center',
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    }, 
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginBottom: '10%'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#3A8C38', 
        marginHorizontal: 10, 
    },
    text: {
        fontSize: 16,
        fontWeight: '400', 
    },
    anotherLoginButton: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
        width: '40%',
        height: 50,
        justifyContent: 'center'
    },
    anotherLoginText: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
    label: {
        alignSelf:'flex-start',
        fontSize: 18,
        color: '#22532A',
        marginLeft: '10%',
        fontWeight: '500'
    }
});
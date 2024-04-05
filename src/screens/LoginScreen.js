import { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={styles.topContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                    <Text style={styles.title}>FarmManager</Text>
                    <Text style={styles.slogan}>Join us and grow your farm</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="E-mail"
                        placeholderTextColor="#A3A3A3"
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        placeholderTextColor="#A3A3A3"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.forgotPasswordTouchableOpacity}
                        onPress={() => console.log('change password')}    
                    >
                        <Text style={{fontWeight: '200'}}>Forgot your password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => console.log("login")}                    
                    >
                        <Text style={styles.loginText}>Log In</Text>
                    </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.bottomConatiner} >
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                        <Text style={styles.text}>or</Text>
                    <View style={styles.line} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={() => console.log("Facebook")}
                        style={styles.anotherLoginButton}
                    >
                        <Text  style={styles.anotherLoginText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         onPress={() => console.log("Goole")}
                        style={[styles.anotherLoginButton, {marginLeft: '10%'}]}
                    >
                        <Text style={styles.anotherLoginText}>Google</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                        style={{marginTop: '5%'}}
                        onPress={() => navigation.navigate('Registration')}    
                    >
                        <Text style={{fontWeight: '400', fontSize: 18}}>Create an account</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
        width: '80%',
        height: '10%',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#D4D4D4',
        marginTop: '5%',
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    forgotPasswordTouchableOpacity: {
        marginTop: '1%',
        alignSelf: 'flex-end',
        marginRight: '12%'
    },
    loginButton: {
        marginTop: '25%',
        width: '80%',
        height: '7%',
        backgroundColor: '#00E000',
        borderRadius: 50,
        justifyContent: 'center',
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
    }, 
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        marginVertical: 20,
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
    }
});

export default LoginScreen;
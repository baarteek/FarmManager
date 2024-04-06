import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../styles/AuthStyles";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
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
        </TouchableWithoutFeedback>
       
    );
};


export default LoginScreen;
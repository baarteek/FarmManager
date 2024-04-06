import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "../styles/AuthStyles";
import { useState } from "react";

const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassowrd] = useState('');


    return (
        <SafeAreaView style={{flex: 1,  backgroundColor: '#fff'}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
            <View style={styles.innerContainer}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput 
                    style={[styles.input, {marginTop: '1%', height: '40%'}]}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="example@email.com"
                    placeholderTextColor="#A3A3A3"
                />
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput 
                    style={[styles.input, {marginTop: '1%', height: '40%'}]}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    placeholder="+48 500 600 700"
                    placeholderTextColor="#A3A3A3"
                />
            </View>
            <View style={styles.innerContainer} >
                <Text style={styles.label}>Password</Text>
                <TextInput 
                        style={[styles.input, {marginTop: '1%', height: '40%'}]}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="*******"
                        placeholderTextColor="#A3A3A3"
                        secureTextEntry={true}
                    />
            </View>
            <View style={styles.innerContainer} >
                <Text style={styles.label}>Repeat password</Text>
                <TextInput 
                        style={[styles.input, {marginTop: '1%', height: '40%'}]}
                        onChangeText={setRepeatedPassowrd}
                        value={repeatedPassword}
                        placeholder="*******"
                        placeholderTextColor="#A3A3A3"
                        secureTextEntry={true}
                    />
            </View>
            <TouchableOpacity
                        style={[styles.loginButton, {marginBottom: '5%'}]}
                        onPress={() => console.log("Sign Up")}                    
                    >
                        <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default RegistrationScreen;
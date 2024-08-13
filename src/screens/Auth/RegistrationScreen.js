import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../styles/AuthStyles";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassowrd] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegistration = async () => {
        if (!email || !userName || !password || !repeatedPassword) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long.");
            return;
        }

        if (password !== repeatedPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/Auth/register`, {
                email,
                userName,
                password,
            });

            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "Registration successful! Please log in.");
                navigation.navigate('Login');
            } else {
                Alert.alert("Error", "Registration failed. Please try again.");
            }
        } catch (error) {
            const errorData = error.response?.data || {};
            const errorMessage = errorData[""]?.[0] || error.message;
            Alert.alert("Error", errorMessage || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.label}>User Name</Text>
                <TextInput 
                    style={[styles.input, {marginTop: '1%', height: '40%'}]}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder="Enter your username"
                    placeholderTextColor="#A3A3A3"
                    autoCapitalize="none"
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
                        onPress={handleRegistration}
                        disabled={loading}                    
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>Sign Up</Text>
                        )}
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default RegistrationScreen;
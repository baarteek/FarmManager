import { useState } from "react";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "../../styles/AuthStyles";
import { useAuth } from "../../context/AuthContext";


const LoginScreen = ({navigation}) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('stringA1@');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        const success = await login(email, password);
        setLoading(false);
        if(!success) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
             <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
                        onPress={() => navigation.navigate('PasswordReset')}    
                    >
                    <Text style={{fontWeight: '200'}}>Forgot your password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}                    
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>Log In</Text>
                        )}
                    </TouchableOpacity>
            </KeyboardAvoidingView>
            {error && <Text style={{ color: 'red', textAlign: 'center', marginBottom: '10%' }}>{error}</Text>}
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
                         onPress={() => console.log("Google")}
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
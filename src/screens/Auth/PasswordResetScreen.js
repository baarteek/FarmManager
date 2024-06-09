import { KeyboardAvoidingView, Keyboard, SafeAreaView, Text, TouchableWithoutFeedback, Platform, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/AuthStyles";
import { useState } from "react";


const PasswordResetScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassowrd] = useState('');
    const [repeatedPassword, setRepeatedPassowrd] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailSubmit = () => {
        // TODO: Implement sending the code to the user's email
        setStep(2);
    };

    const handleCodeVerification = () => {
        // TODO: Implement code verification logic
        setStep(3);
    };

    const handlePasswordChange = () => {
        // TODO: Implement password change logic
        setStep(1);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} >
                <View style={styles.infoContainer}>
                    {
                        step === 1 && (
                            <Text style={[styles.label, {textAlign: 'center', marginLeft: 0}]}>Please enter your e-mail address to receive a verification code.</Text>
                        )
                    }
                    {
                        step === 2 && (
                            <Text style={[styles.label, {textAlign: 'center', marginLeft: 0}]}>We've sent a code to your e-mail. Please enter it below.</Text>
                        )
                    }
                    {
                        step === 3 && (
                            <Text style={[styles.label, {textAlign: 'center', marginLeft: 0}]}>Please enter a new password for your account.</Text>
                        )
                    }
                   
                </View>
                <KeyboardAvoidingView
                    style={[styles.container, {justifyContent: 'flex-start'}]}
                >
                {
                    step === 1 && (
                        <>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>Enter your E-mail</Text>
                            <TextInput 
                                style={[styles.input, {marginTop: '2%', height: '40%'}]}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="example@email.com"
                                placeholderTextColor="#A3A3A3"
                                autoFocus={true}
                            />
                        </View>
                        <TouchableOpacity
                                style={[styles.loginButton, {marginBottom: '20%', marginTop: '5%'}]}
                                onPress={handleEmailSubmit}                    
                            >
                                <Text style={styles.loginText}>Send Mail</Text>
                        </TouchableOpacity>
                        </>
                    )
                }
                {
                    step === 2 && (
                        <>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>Enter the code</Text>
                            <TextInput 
                                style={[styles.input, {marginTop: '2%', height: '40%'}]}
                                onChangeText={setCode}
                                value={code}
                                placeholder="12345"
                                placeholderTextColor="#A3A3A3"
                                autoFocus={true}
                            />
                        </View>
                        <TouchableOpacity
                                style={[styles.loginButton, {marginBottom: '5%', marginTop: '5%'}]}
                                onPress={handleCodeVerification}                    
                            >
                                <Text style={styles.loginText}>Verify Code</Text>
                        </TouchableOpacity>
                        </>
                    )
                }
                {
                    step === 3 && (
                        <>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>Enter your new password</Text>
                            <TextInput 
                                style={[styles.input, {marginTop: '2%', height: '40%'}]}
                                onChangeText={setNewPassowrd}
                                value={newPassword}
                                placeholder="********"
                                placeholderTextColor="#A3A3A3"
                                autoFocus={true}
                            />
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>Enter your new password again</Text>
                            <TextInput 
                                style={[styles.input, {marginTop: '1%', height: '40%'}]}
                                onChangeText={setRepeatedPassowrd}
                                value={repeatedPassword}
                                placeholder="********"
                                placeholderTextColor="#A3A3A3"
                            />
                        </View>
                        <TouchableOpacity
                                style={[styles.loginButton, {marginBottom: '5%', marginTop: '5%'}]}
                                onPress={handlePasswordChange}                    
                            >
                                <Text style={styles.loginText}>Change Password</Text>
                        </TouchableOpacity>
                        </>
                    )
                }
                
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default PasswordResetScreen;
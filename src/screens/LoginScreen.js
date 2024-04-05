import { Button, SafeAreaView, Text } from "react-native";


const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Login Screen</Text>
            <Button
                onPress={() => navigation.navigate('SignIn')}
                title="Sign In"
             />
        </SafeAreaView>
    );
};

export default LoginScreen;
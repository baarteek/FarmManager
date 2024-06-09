import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import PasswordResetScreen from "../screens/Auth/PasswordResetScreen";
import LoginScreen from "../screens/Auth/LoginScreen";


const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerTintColor: '#22532A',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                 />
                 <Stack.Screen 
                    name="Registration" 
                    component={RegistrationScreen} 
                    options={{title: 'Registration'}}
                 />
                 <Stack.Screen 
                    name="PasswordReset"
                    component={PasswordResetScreen}
                    options={{title: 'Password Reset'}}
                 />
            </Stack.Navigator>
    )
}; 

export default AuthNavigation;

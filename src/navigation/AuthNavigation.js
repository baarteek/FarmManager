import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
    return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                 />
                 <Stack.Screen 
                    name="Registration" 
                    component={SignInScreen} 
                    options={{title: 'Registration'}}
                 />
            </Stack.Navigator>
    )
};

export default AuthNavigation;

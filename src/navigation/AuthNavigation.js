import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
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
                    name="SignIn" 
                    component={SignInScreen} 
                    options={{title: 'SignIn'}}
                 />
            </Stack.Navigator>
    )
};

export default AuthNavigation;

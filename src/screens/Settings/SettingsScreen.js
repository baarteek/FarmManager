import { Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

const SettingsScreen = ({navigation}) => {
    const { logout } = useAuth();

    return (
        <Button
            title="Log Out"
            onPress={logout}
         />
    );
};

export default SettingsScreen;
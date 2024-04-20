import { Text, View } from "react-native";
import { styles } from "../styles/AppStyles";

const ErrorView = ({title="Error", message}) => {
    return (
        <>
            <View style={styles.container} >
                <View style={[styles.topContainer, {backgroundColor: '#db5b51'}]}>
                    <Text style={[styles.title, {color: '#fff'}]}>{title}</Text>
                 </View>
                <View style={[styles.bottomContainer, {backgroundColor: '#db5b51', alignItems: 'center'}]}>
                    <Text style={[styles.text, {color: '#fff'}]}>{message}</Text>
                </View>
            </View>
        </>
    );
};

export default ErrorView;
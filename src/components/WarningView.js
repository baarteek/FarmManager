import { Text, View } from "react-native";
import { styles } from "../styles/AppStyles";

const WarningView = ({title="Warning", message}) => {
    return (
        <>
            <View style={styles.container} >
                <View style={[styles.topContainer, {backgroundColor: '#FCE699'}]}>
                    <Text style={[styles.title, {color: '#4B534C'}]}>{title}</Text>
                 </View>
                <View style={[styles.bottomContainer, {backgroundColor: '#FCE699', alignItems: 'center'}]}>
                    <Text style={[styles.text, {color: '#4B534C', textAlign: 'center'}]}>{message}</Text>
                </View>
            </View>
        </>
    );
};



export default WarningView;
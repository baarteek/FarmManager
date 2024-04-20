import { styles } from "../styles/AppStyles";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingView = ({title="Loading...", titleStyles, activityIndicatorColor, containerBackgroundStyles}) => {
    return (
        <>
            <View style={styles.container} >
                <View style={[styles.topContainer, containerBackgroundStyles]}>
                    <Text style={[styles.title, titleStyles]}>{title}</Text>
                 </View>
                <View style={[styles.bottomContainer, containerBackgroundStyles]}>
                    <ActivityIndicator size="large" color={activityIndicatorColor} />
                </View>
            </View>
        </>
    );
};

export default LoadingView;
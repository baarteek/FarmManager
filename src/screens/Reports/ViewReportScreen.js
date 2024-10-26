import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ViewReportScreen = ({ route }) => {
    const { htmlContent } = route.params;

    return (
        <View style={styles.container}>
            <WebView 
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.webView}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webView: {
        flex: 1,
    },
});

export default ViewReportScreen;

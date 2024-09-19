import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMapContext } from "../../context/MapProvider";

const MapScreen = ({ navigation }) => {
    const { mapData, loading, error, fetchMapData } = useMapContext();

    useEffect(() => {
        fetchMapData('90673cf9-dbf8-4133-b465-2b7d47ca2a00');
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <ScrollView >
            {Array.isArray(mapData) && mapData.length > 0 ? (
                mapData.map((item) => (
                    <View key={item.fieldId} style={{ marginBottom: 20 }}>
                        <Text>Field Name: {item.fieldName}</Text>
                        <Text>Area: {item.area}</Text>
                        <Text>Coordinates: {item.coordinates}</Text>
                        <Text>Crop Name: {item.cropName}</Text>
                    </View>
                ))
            ) : (
                <Text>No map data available.</Text>
            )}
        </ScrollView>
    );
};

export default MapScreen;

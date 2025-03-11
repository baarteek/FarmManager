import React, { useState, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/AppStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocationContext } from "../../context/LocationProvider";
import useWeatherData from "../../hooks/useWeatherData";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import { weatherStyles } from "../../styles/WeatherStyles";
import TodayWeatherDetails from "../../components/TodayWeatherDetails";
import LatestOperations from "../../components/LatestOperations";

const HomeScreen = () => {
    const { location, locationError } = useLocationContext();
    const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(
        location?.coords?.latitude,
        location?.coords?.longitude
    );

    const [latestOperation, setLatestOperation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestOperations = async () => {
            try {
                const storedCultivation = await AsyncStorage.getItem("cultivationOperations");
                const storedFertilization = await AsyncStorage.getItem("fertilizations");
                const storedPlantProtection = await AsyncStorage.getItem("plantProtections");

                const cultivationOperations = storedCultivation ? JSON.parse(storedCultivation) : [];
                const fertilizations = storedFertilization ? JSON.parse(storedFertilization) : [];
                const plantProtections = storedPlantProtection ? JSON.parse(storedPlantProtection) : [];

                // Połącz wszystkie operacje i posortuj według daty (od najnowszej)
                const allOperations = [...cultivationOperations, ...fertilizations, ...plantProtections]
                    .sort((a, b) => new Date(b.date) - new Date(a.date));

                // Pobierz najnowszą operację z każdej kategorii
                const latestCultivation = cultivationOperations.length > 0 ? cultivationOperations[0] : null;
                const latestFertilization = fertilizations.length > 0 ? fertilizations[0] : null;
                const latestPlantProtection = plantProtections.length > 0 ? plantProtections[0] : null;

                setLatestOperation({
                    cultivationOperationName: latestCultivation?.name || null,
                    cultivationOperationDate: latestCultivation?.date || null,
                    cultivationOperationDescription: latestCultivation?.description || null,
                    cultivationOperationCrop: latestCultivation?.crop || null,

                    plantProtectionName: latestPlantProtection?.name || null,
                    plantProtectionDate: latestPlantProtection?.date || null,
                    plantProtectionDescription: latestPlantProtection?.description || null,
                    plantProtectionCrop: latestPlantProtection?.crop || null,

                    fertilizationName: latestFertilization?.name || null,
                    fertilizationDate: latestFertilization?.date || null,
                    fertilizationDescription: latestFertilization?.description || null,
                    fertilizationCrop: latestFertilization?.crop || null,
                });

            } catch (err) {
                console.error("Błąd podczas pobierania operacji z AsyncStorage:", err);
                setError("Wystąpił błąd podczas ładowania operacji.");
            } finally {
                setLoading(false);
            }
        };

        fetchLatestOperations();
    }, []);

    if (!location && !locationError) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <LoadingView title="Ładowanie lokalizacji..." activityIndicatorColor="#22532A" />
            </ScrollView>
        );
    } else if (locationError) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <ErrorView title="Błąd lokalizacji" message={locationError} />
            </ScrollView>
        );
    }

    if (weatherLoading || loading) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <LoadingView title="Ładowanie danych..." activityIndicatorColor="#22532A" />
            </ScrollView>
        );
    }

    if (weatherError || error) {
        return (
            <ScrollView style={styles.mainCantainer}>
                <ErrorView title="Błąd" message={weatherError || error} />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.mainCantainer}>
            <View style={styles.container}>
                <View style={[styles.topContainer, weatherStyles.container]}>
                    <Text style={[styles.title, weatherStyles.title]}>Dzisiejsza pogoda</Text>
                </View>
                <View style={[styles.bottomContainer, weatherStyles.container]}>
                    <View style={styles.content}>
                        {weatherData ? (
                            <TodayWeatherDetails hourlyData={weatherData.hourly} />
                        ) : (
                            <Text style={styles.text}>Brak danych pogodowych</Text>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.container}>
                <View style={[styles.topContainer, styles.container]}>
                    <Text style={[styles.title, { fontSize: 25 }]}>Ostatnie operacje</Text>
                </View>
                {latestOperation ? (
                    <LatestOperations data={latestOperation} />
                ) : (
                    <Text style={styles.text}>Brak ostatnich operacji</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
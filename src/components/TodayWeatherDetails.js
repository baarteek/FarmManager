import { ScrollView, Text, View, Dimensions} from "react-native";
import { styles } from "../styles/AppStyles";
import { getWeatherDetails } from "../utils/WeatherUtils";
import { weatherStyles } from "../styles/WeatherStyles";
import { useCallback, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

const TodayWeatherDetails = ({ hourlyData }) => {
    const scrollViewRef = useRef();
    const firstDayData = {
        time: hourlyData.time.slice(0, 24),
        weather_code: hourlyData.weather_code.slice(0, 24),
        temperature_2m: hourlyData.temperature_2m.slice(0, 24),
    };

    const extractTime = (time) => {
        const formatter = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit', hour12: false });
        return formatter.format(new Date(time));
    };

    useFocusEffect(
        useCallback(() => {
            const scrollToCurrentHour = () => {
                const now = new Date();
                const currentHour = now.getHours();
                const currentIndex = currentHour;
                const screenWidth = Dimensions.get('window').width;
                const itemWidth = screenWidth / 3;
                const scrollOffset = currentIndex * itemWidth - screenWidth / 2 + itemWidth / 2;
    
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: scrollOffset, animated: false });
                }
            };
    
            scrollToCurrentHour();
        }, [])
    );

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
        >
            {firstDayData.time.map((time, index) => {
                const { icon } = getWeatherDetails(firstDayData.weather_code[index]);
                return (
                    <View key={index} style={styles.horizontalContainer}>
                        <Text style={[styles.largeText, weatherStyles.largeText]}>{extractTime(time)}</Text>
                        {icon}
                        <Text style={[styles.largeText, weatherStyles.largeText]}>{firstDayData.temperature_2m[index]}°C</Text>
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default TodayWeatherDetails;
import { useState, useEffect } from 'react';

const useWeatherData = (latitude, longitude) => {
    const [weatherData, setWeatherData] = useState({ current: null, forecast: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,weather_code,visibility,wind_speed_10m,wind_direction_10m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;
                const response = await fetch(url);
                const data = await response.json();
                setWeatherData({
                    current: data.current,
                    current_units: data.current_units,
                    hourly: data.hourly,
                    hourly_units: data.hourly_units,
                    daily: data.daily,
                    daily_units: data.daily_units
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude]);

    return { weatherData, loading, error };
};

export default useWeatherData;

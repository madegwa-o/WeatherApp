'use client';

import React, { useState, useEffect } from 'react';
import SearchBox from '@/app/components/SearchBox';
import UnitToggle from '@/app/components/UnitToggle';
import CurrentWeather from '@/app/components/CurrentWeather';
import WeatherStats from '@/app/components/WeatherStats';
import { WeatherData, TemperatureUnit } from '@/types/weather';
import Forecast from "@/app/components/WeatherForecast";

const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [unit, setUnit] = useState<TemperatureUnit>('metric');
    const [city, setCity] = useState<string>('');

    const handleSearch = async (searchCity: string) => {
        setLoading(true);
        setError(null);
        setCity(searchCity);

        try {
            // Fetch weather data from Laravel backend
            const weatherResponse = await fetch(
                `http://127.0.0.1:8000/api/weather/current?city=${searchCity}&units=${unit}`
            );

            if (!weatherResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weatherResult = await weatherResponse.json();
            setWeatherData(weatherResult);
        } catch (err: any) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleUnitChange = (newUnit: TemperatureUnit) => {
        setUnit(newUnit);
    };

    // Effect to refresh data when unit changes
    useEffect(() => {
        if (city) {
            handleSearch(city);
        }
    }, [unit]);

    // Initialize with a default city
    useEffect(() => {
        handleSearch('Nairobi');
    }, []);


    return (
        <div className=" container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6">
                {/* Left Panel: Current Weather */}
                <div className="md:col-span-4 bg-white rounded-lg shadow-lg p-6">
                    {weatherData && (
                        <CurrentWeather weatherData={weatherData} unit={unit} />
                    )}
                </div>

                {/* Right Panel: Search, Forecast, and Stats */}
                <div className="md:col-span-8 space-y-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-grow">
                            <SearchBox onSearch={handleSearch} />
                        </div>
                        <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
                    </div>

                    {loading && (
                        <div className="text-center p-6">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-error">
                            <span>{error}</span>
                        </div>
                    )}

                    {weatherData && !loading && (
                        <>
                            <Forecast weatherData={weatherData} unit={unit} />
                            <WeatherStats weatherData={weatherData} unit={unit} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
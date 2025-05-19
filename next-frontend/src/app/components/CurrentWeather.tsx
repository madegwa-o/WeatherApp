'use client';

import React from 'react';
import { WeatherData, TemperatureUnit } from '@/types/weather';

interface CurrentWeatherProps {
    weatherData: WeatherData;
    unit: TemperatureUnit;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, unit }) => {
    if (!weatherData || !weatherData.current) {
        return null;
    }

    const { current } = weatherData;
    const weather = current.weather[0];
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    // Format date
    const date = new Date(current.dt * 1000);
    const formattedDate = `${date.getDate()}${getDaySuffix(date.getDate())} ${
        getMonthName(date.getMonth())
    } ${date.getFullYear()}`;

    // Get weather icon
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <img
                src={iconUrl}
                alt={weather.description}
                className="w-24 h-24"
            />
            <h1 className="text-4xl font-bold mt-2">
                {Math.round(current.temp)}{unitSymbol}
            </h1>
            <p className="text-xl capitalize mt-1">{weather.description}</p>
            <div className="mt-4 text-center">
                <p className="text-lg">
                    {formattedDate}
                </p>
                <p className="text-lg">{weatherData.timezone.replace('_', ' ')}</p>
            </div>
        </div>
    );
};

// Helper functions
function getDaySuffix(day: number): string {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function getMonthName(month: number): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
}

export default CurrentWeather;
'use client';

import React from 'react';
import { WeatherData, TemperatureUnit } from '@/types/weather';

interface ForecastProps {
    weatherData: WeatherData;
    unit: TemperatureUnit;
}

const Forecast: React.FC<ForecastProps> = ({ weatherData, unit }) => {
    if (!weatherData || !weatherData.daily) {
        return null;
    }

    // Get next 3 days of forecast data (excluding today)
    const forecastDays = weatherData.daily.slice(1, 4);
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    return (
        <div className="grid grid-cols-3 gap-4 mt-6">
            {forecastDays.map((day, index) => {
                const date = new Date(day.dt * 1000);
                const dayName = getDayName(date.getDay());
                const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

                return (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="font-medium text-lg">{dayName}</p>
                        <img
                            src={iconUrl}
                            alt={day.weather[0].description}
                            className="w-16 h-16 mx-auto"
                        />
                        <p className="text-sm">
                            {Math.round(day.temp.min)}-{Math.round(day.temp.max)}{unitSymbol}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

// Helper function
function getDayName(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

export default Forecast;
'use client';

import React from 'react';
import { WeatherData, TemperatureUnit } from '@/types/weather';

interface WeatherStatsProps {
    weatherData: WeatherData;
    unit: TemperatureUnit;
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ weatherData, unit }) => {
    if (!weatherData || !weatherData.current) {
        return null;
    }

    const { current } = weatherData;
    const windUnit = unit === 'metric' ? 'km/h' : 'mph';

    // Convert m/s to km/h if metric
    const windSpeed = unit === 'metric'
        ? Math.round(current.wind_speed * 3.6) // convert m/s to km/h
        : Math.round(current.wind_speed);

    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            {/* Wind Status */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4 text-center">Wind Status</h3>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold">{windSpeed} {windUnit}</p>
                    <div className="mt-4 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{
                                    transform: `rotate(${current.wind_deg}deg)`
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </div>
                        <span className="ml-2">WSW</span>
                    </div>
                </div>
            </div>

            {/* Humidity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4 text-center">Humidity</h3>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold">{current.humidity}%</p>
                    <div className="w-full mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${current.humidity}%` }}
                            ></div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-4 flex justify-between items-center">
                            {[0, 25, 50, 75, 100].map((value) => (
                                <div
                                    key={value}
                                    className="w-1 h-4 bg-gray-400"
                                    style={{ left: `${value}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherStats;
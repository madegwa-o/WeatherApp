"use client";


import React from 'react';
import { TemperatureUnit } from '@/types/weather';

interface UnitToggleProps {
    unit: TemperatureUnit;
    onUnitChange: (unit: TemperatureUnit) => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onUnitChange }) => {
    return (
        <div className="flex items-center gap-2 p-2 border rounded-lg">
            <button
                className={`px-2 py-1 rounded-md ${
                    unit === 'metric' ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
                onClick={() => onUnitChange('metric')}
            >
                °C
            </button>
            <button
                className={`px-2 py-1 rounded-md ${
                    unit === 'imperial' ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
                onClick={() => onUnitChange('imperial')}
            >
                °F
            </button>
        </div>
    );
};
export default UnitToggle;
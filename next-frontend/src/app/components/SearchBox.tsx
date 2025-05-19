'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBoxProps {
    onSearch: (city: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [city, setCity] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className={`relative flex items-center transition-all duration-300 ${
                    isFocused ? "shadow-lg" : "shadow-md"
                }`}
            >
                <input
                    type="text"
                    placeholder="Search for a city..."
                    className="w-full px-4 py-3 bg-white rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                <button
                    type="submit"
                    className="absolute right-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                    aria-label="Search"
                >
                    <Search size={20} />
                </button>
            </form>

            {city.length > 0 && (
                <div className="flex justify-end mt-1">
                    <button
                        onClick={() => setCity('')}
                        className="text-xs text-gray-500 hover:text-gray-700"
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBox;
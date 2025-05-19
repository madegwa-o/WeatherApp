// types/weather.ts
export interface WeatherData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: {
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        rain?: { '1h': number };
        sunrise: number;
        sunset: number;
        temp: number;
        uvi: number;
        visibility: number;
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        wind_deg: number;
        wind_gust?: number;
        wind_speed: number;
    };
    daily: Array<{
        clouds: number;
        dew_point: number;
        dt: number;
        feels_like: {
            day: number;
            night: number;
            eve: number;
            morn: number;
        };
        humidity: number;
        moon_phase: number;
        moonrise: number;
        moonset: number;
        pop: number;
        pressure: number;
        rain?: number;
        summary: string;
        sunrise: number;
        sunset: number;
        temp: {
            day: number;
            min: number;
            max: number;
            night: number;
            eve: number;
            morn: number;
        };
        uvi: number;
        weather: Array<{
            id: number;
            main: string;
            description: string;
            icon: string;
        }>;
        wind_deg: number;
        wind_gust?: number;
        wind_speed: number;
    }>;
    hourly?: Array<any>; // Not using detailed hourly data for this app
}

export type TemperatureUnit = 'metric' | 'imperial';
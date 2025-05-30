# Weather App

A modern weather application built with Laravel and React that provides current weather conditions, forecasts, historical data, and AI-generated weather overviews using the OpenWeatherMap API.

[![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange?style=for-the-badge)](https://openweathermap.org/api)

![Weather App Screenshot](https://via.placeholder.com/800x450.png?text=Weather+App+Screenshot)

## Features

✅ **Current Weather Data** - Display real-time weather conditions including temperature, humidity, wind speed, and more

✅ **Weather Forecasts** - Show upcoming weather predictions for the next several days

✅ **Historical Weather** - Access past weather data for any location

✅ **Daily Aggregations** - Get summarized weather data for entire days

✅ **AI-Generated Overviews** - Natural language summaries of weather conditions

✅ **City Search** - Find weather data for any city worldwide

✅ **Unit Conversion** - Switch between metric and imperial measurement systems

## Tech Stack

### Backend
- **Laravel 10** - PHP framework
- **OpenWeatherMap API 3.0** - Weather data provider
- **Guzzle** - HTTP client for API requests

### Frontend
- **React 18** with Next.js
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

## Project Structure

```
├── backend (Laravel)
│   ├── app
│   │   ├── Http
│   │   │   └── Controllers
│   │   │       └── WeatherController.php
│   │   └── Services
│   │       └── OpenWeatherService.php
│   ├── routes
│   │   └── api.php
│   └── .env
│
└── frontend (React)
    ├── app
    │   ├── components
    │   │   ├── CurrentWeather.tsx
    │   │   ├── SearchBox.tsx
    │   │   ├── UnitToggle.tsx
    │   │   ├── WeatherForecast.tsx
    │   │   └── WeatherStats.tsx
    │   └── page.tsx
    └── types
        └── weather.ts
```

## API Endpoints

The application exposes the following API endpoints:

| Endpoint | Method | Description | Parameters |
|----------|--------|-------------|------------|
| `/api/weather/current` | GET | Current weather & forecast | `city`, `lat`, `lon`, `units`, `exclude` |
| `/api/weather/historical` | GET | Historical weather data | `city`, `lat`, `lon`, `dt`, `units` |
| `/api/weather/daily` | GET | Daily weather aggregation | `city`, `lat`, `lon`, `date`, `units` |
| `/api/weather/overview` | GET | AI-generated weather overview | `city`, `lat`, `lon`, `date`, `units` |

### Parameters

- `city`: City name (e.g., "London")
- `lat`, `lon`: Geographic coordinates
- `units`: Unit system (metric/imperial)
- `exclude`: Parts to exclude from response (comma-separated)
- `dt`: Unix timestamp for historical data
- `date`: Date in YYYY-MM-DD format for daily aggregation

## Installation

### Prerequisites

- PHP 8.1+
- Composer
- Node.js 16+
- npm or yarn
- OpenWeatherMap API key

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app/backend
   ```

2. Install PHP dependencies
   ```bash
   composer install
   ```

3. Create environment file
   ```bash
   cp .env.example .env
   ```

4. Generate application key
   ```bash
   php artisan key:generate
   ```

5. Configure your `.env` file with your OpenWeatherMap API key
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   OPENWEATHER_API_BASE_URL=https://api.openweathermap.org/
   ```

6. Start the Laravel development server
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install JavaScript dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Configuration

The application can be configured through the following environment variables:

### Backend (.env)

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:KgeZBBcgOTdoLfOyPnAcycWiDmgCvEGiS1rMxg/DFls=
APP_DEBUG=true
APP_URL=http://localhost

OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_API_BASE_URL=https://api.openweathermap.org/
```

## CORS Configuration

The application includes CORS middleware to allow cross-origin requests from the frontend:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware {
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    }
}
```

## License

[MIT](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Your Icon Provider]
- Built with [Laravel](https://laravel.com/) and [React](https://reactjs.org/)

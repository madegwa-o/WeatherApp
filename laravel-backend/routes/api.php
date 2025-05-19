<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// OpenWeather API routes
Route::prefix('weather')->group(function () {
    // Get current weather and forecasts
    Route::get('/current', [WeatherController::class, 'getWeather']);

    // Get historical weather for a specific timestamp
    Route::get('/historical', [WeatherController::class, 'getHistoricalWeather']);

    // Get daily aggregation weather data
    Route::get('/daily', [WeatherController::class, 'getDailyAggregation']);

    // Get AI-generated weather overview
    Route::get('/overview', [WeatherController::class, 'getWeatherOverview']);
});
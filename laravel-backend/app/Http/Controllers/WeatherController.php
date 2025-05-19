<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OpenWeatherService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(OpenWeatherService $weatherService)
    {
        $this->weatherService = $weatherService;
    }

    /**
     * Get current weather and forecasts
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeather(Request $request): JsonResponse
    {
        $city = $request->input('city');
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $units = $request->input('units', 'metric');
        $exclude = $request->input('exclude', '');

        Log::info("City is: $city");

        // Convert exclude to array if it's a string
        if (is_string($exclude) && !empty($exclude)) {
            $exclude = explode(',', $exclude);
        }

        // If coordinates are not provided but city is, get coordinates for city
        if ((!$lat || !$lon) && $city) {
            $coords = $this->weatherService->getCoordinatesForCity($city);

            Log::info('Coordinates retrieved:', ['coords' => $coords]);
            // Log coordinates or indicate failure
            if ($coords) {

                $lat = $coords['lat'];
                $lon = $coords['lon'];
            } else {
                Log::warning("City not found: $city");
                return response()->json([
                    'error' => true,
                    'message' => 'City not found',
                ], 404);
            }
        }

        // Validate coordinates
        if (!$lat || !$lon) {
            Log::error("Missing coordinates for city: $city");
            return response()->json([
                'error' => true,
                'message' => 'Latitude and longitude are required',
            ], 400);
        }

        $data = $this->weatherService->getCurrentAndForecast($lat, $lon, $units, $exclude);

        // Log the retrieved data or errors
        if (isset($data['error']) && $data['error']) {
            Log::error('Weather API error:', ['error' => $data]);
            return response()->json($data, 500);
        }

        Log::info('Weather data retrieved successfully:', ['data' => $data]);

        return response()->json($data);
    }


    /**
     * Get historical weather data for a specific timestamp
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getHistoricalWeather(Request $request): JsonResponse
    {
        $city = $request->input('city');
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $dt = $request->input('dt'); // timestamp
        $units = $request->input('units', 'metric');

        // If coordinates are not provided but city is, get coordinates for city
        if ((!$lat || !$lon) && $city) {
            $coords = $this->weatherService->getCoordinatesForCity($city);
            if ($coords) {
                $lat = $coords['lat'];
                $lon = $coords['lon'];
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'City not found'
                ], 404);
            }
        }

        // Validate coordinates and timestamp
        if (!$lat || !$lon) {
            return response()->json([
                'error' => true,
                'message' => 'Latitude and longitude are required'
            ], 400);
        }

        if (!$dt) {
            return response()->json([
                'error' => true,
                'message' => 'Timestamp is required'
            ], 400);
        }

        $data = $this->weatherService->getHistoricalWeather($lat, $lon, $dt, $units);

        if (isset($data['error']) && $data['error']) {
            return response()->json($data, 500);
        }

        return response()->json($data);
    }

    /**
     * Get daily aggregation of weather data
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getDailyAggregation(Request $request): JsonResponse
    {
        $city = $request->input('city');
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $date = $request->input('date'); // YYYY-MM-DD
        $units = $request->input('units', 'metric');

        // If coordinates are not provided but city is, get coordinates for city
        if ((!$lat || !$lon) && $city) {
            $coords = $this->weatherService->getCoordinatesForCity($city);
            if ($coords) {
                $lat = $coords['lat'];
                $lon = $coords['lon'];
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'City not found'
                ], 404);
            }
        }

        // Validate coordinates and date
        if (!$lat || !$lon) {
            return response()->json([
                'error' => true,
                'message' => 'Latitude and longitude are required'
            ], 400);
        }

        if (!$date) {
            return response()->json([
                'error' => true,
                'message' => 'Date is required (YYYY-MM-DD format)'
            ], 400);
        }

        $data = $this->weatherService->getDailyAggregation($lat, $lon, $date, $units);

        if (isset($data['error']) && $data['error']) {
            return response()->json($data, 500);
        }

        return response()->json($data);
    }

    /**
     * Get AI-generated weather overview
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeatherOverview(Request $request): JsonResponse
    {
        $city = $request->input('city');
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $date = $request->input('date'); // optional, YYYY-MM-DD
        $units = $request->input('units', 'metric');

        // If coordinates are not provided but city is, get coordinates for city
        if ((!$lat || !$lon) && $city) {
            $coords = $this->weatherService->getCoordinatesForCity($city);
            if ($coords) {
                $lat = $coords['lat'];
                $lon = $coords['lon'];
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'City not found'
                ], 404);
            }
        }

        // Validate coordinates
        if (!$lat || !$lon) {
            return response()->json([
                'error' => true,
                'message' => 'Latitude and longitude are required'
            ], 400);
        }

        $data = $this->weatherService->getWeatherOverview($lat, $lon, $date, $units);

        if (isset($data['error']) && $data['error']) {
            return response()->json($data, 500);
        }

        return response()->json($data);
    }
}
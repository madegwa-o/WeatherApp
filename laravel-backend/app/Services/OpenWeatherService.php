<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class OpenWeatherService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('OPENWEATHER_API_KEY');
        $this->client = new Client([
            'base_uri' => env('OPENWEATHER_API_BASE_URL'),
            'verify' => false,
        ]);
    }

    /**
     * Get current weather and forecasts using One Call API 3.0
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string $units Units of measurement (standard, metric, imperial)
     * @param array $exclude Parts to exclude from the response
     * @return array Weather data
     */
    public function getCurrentAndForecast($lat, $lon, $units = 'metric', $exclude = [])
    {
        try {
            $response = $this->client->get('/data/3.0/onecall', [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'appid' => $this->apiKey,
                    'units' => $units,
                    'exclude' => !empty($exclude) ? implode(',', $exclude) : null,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            Log::error('OpenWeather API error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Unable to fetch weather data',
                'details' => $e->getMessage()
            ];
        }
    }

    /**
     * Get weather data for a specific timestamp
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param int $timestamp Unix timestamp
     * @param string $units Units of measurement
     * @return array Weather data
     */
    public function getHistoricalWeather($lat, $lon, $timestamp, $units = 'metric')
    {
        try {
            $response = $this->client->get('/data/3.0/onecall/timemachine', [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'dt' => $timestamp,
                    'appid' => $this->apiKey,
                    'units' => $units,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            Log::error('OpenWeather API error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Unable to fetch historical weather data',
                'details' => $e->getMessage()
            ];
        }
    }

    /**
     * Get daily aggregated weather data
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string $date Date in YYYY-MM-DD format
     * @param string $units Units of measurement
     * @return array Weather data
     */
    public function getDailyAggregation($lat, $lon, $date, $units = 'metric')
    {
        try {
            $response = $this->client->get('/data/3.0/onecall/day_summary', [
                'query' => [
                    'lat' => $lat,
                    'lon' => $lon,
                    'date' => $date,
                    'appid' => $this->apiKey,
                    'units' => $units,
                ],
            ]);

            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            Log::error('OpenWeather API error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Unable to fetch daily aggregation data',
                'details' => $e->getMessage()
            ];
        }
    }

    /**
     * Get AI-generated weather overview
     * 
     * @param float $lat Latitude
     * @param float $lon Longitude
     * @param string|null $date Date in YYYY-MM-DD format (optional)
     * @param string $units Units of measurement
     * @return array Weather data
     */
    public function getWeatherOverview($lat, $lon, $date = null, $units = 'metric')
    {
        try {
            $query = [
                'lat' => $lat,
                'lon' => $lon,
                'appid' => $this->apiKey,
                'units' => $units,
            ];

            if ($date) {
                $query['date'] = $date;
            }

            $response = $this->client->get('/data/3.0/onecall/overview', [
                'query' => $query,
            ]);

            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            Log::error('OpenWeather API error: ' . $e->getMessage());
            return [
                'error' => true,
                'message' => 'Unable to fetch weather overview',
                'details' => $e->getMessage()
            ];
        }
    }

    /**
     * Convert city name to coordinates
     * 
     * @param string $city City name
     * @return array|null Coordinates [lat, lon] or null if not found
     */
    public function getCoordinatesForCity($city)
    {
        try {
            $response = $this->client->get('geo/1.0/direct', [
                'query' => [
                    'q' => $city,
                    'appid' => $this->apiKey,
                ],
            ]);

            // Decode the JSON response
            $data = json_decode($response->getBody(), true);

            Log::info('Response retrieved:', $data);

            // Check if the response contains valid coordinates
            if (isset($data[0]['lat']) && isset($data[0]['lon'])) {
                return [
                    'lat' => $data[0]['lat'],
                    'lon' => $data[0]['lon'],
                ];
            }

            return null;
        } catch (GuzzleException $e) {
            Log::error('OpenWeather API error: ' . $e->getMessage());
            return null;
        }
    }

}
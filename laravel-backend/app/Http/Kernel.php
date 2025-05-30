<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * These middleware are run during every request to your application.
     *
     * @var array
     */
    protected $middleware = [
        // Other middleware
        \App\Http\Middleware\CorsMiddleware::class, // Add your CORS middleware here
    ];

    // The rest of the Kernel class definition
}

<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))

    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    ->withMiddleware(function (Middleware $middleware): void {

        // 🔥 Middleware default + inertia
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 🔥 Alias middleware admin
        $middleware->alias([
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })

    // 🔥 HANDLE ERROR (biar ga blank kalau error)
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function ($request, $e) {
            if ($e->getCode() === 403) {
                return response()->view('errors.403', [], 403);
            }
        });

    })

    ->create();
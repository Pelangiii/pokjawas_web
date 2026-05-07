<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 🔐 Cek apakah user login & punya role admin
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        // ❌ Kalau bukan admin
        abort(403, 'AKSES DITOLAK - KHUSUS ADMIN');
    }
}
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        // Regenerate session untuk keamanan dan membersihkan data session lama
        $request->session()->regenerate();

        // Redirect ke 'manajemen' jika ada, jika tidak ke dashboard default
        if (Route::has('manajemen')) {
            return redirect()->intended(route('manajemen'));
        }
        
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        // Menghapus semua data session agar tidak ada data user sebelumnya yang nyangkut
        $request->session()->invalidate();

        // Membuat CSRF token baru demi keamanan
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
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

        // Regenerate session untuk keamanan
        $request->session()->regenerate();

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 🔥 SET ROLE BERDASARKAN DOMAIN EMAIL
        if (str_ends_with($user->email, '@pokjawas.com')) {
            $user->role = 'admin';
        } else {
            $user->role = 'pegawai';
        }

        $user->save();

        // 🔥 REDIRECT BERDASARKAN ROLE
        if ($user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('user.dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        // Menghapus semua data session
        $request->session()->invalidate();

        // Membuat CSRF token baru
        $request->session()->regenerateToken();

        return redirect('/');
    }
}

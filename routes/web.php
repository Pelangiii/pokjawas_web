<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

/* ================= LANDING PAGE & HALAMAN PUBLIK ================= */

Route::get('/', function () {
    return Inertia::render('Landing_Page', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'beritas' => [], // Kirim array kosong dulu agar aman di frontend
    ]);
})->name('home');

Route::get('/struktur', function () {
    return Inertia::render('Struktur_Anggota');
})->name('struktur');

Route::get('/berita', function () {
    return Inertia::render('Berita/Berita_Lain');
})->name('berita');

Route::get('/berita/{id}', function ($id) {
    return Inertia::render('Berita/Detail_Berita', [
        'id' => $id
    ]);
})->name('berita.detail');

Route::get('/kegiatan', function () {
    return Inertia::render('Kegiatan/Kegiatan_Lain');
})->name('kegiatan');

Route::get('/kegiatan/{id}', function ($id) {
    return Inertia::render('Kegiatan/Detail_Kegiatan', [
        'id' => $id
    ]);
})->name('kegiatan.detail');


/* ================= DASHBOARD & AUTH UMUM (SEMENTARA TANPA CONTROLLER) ================= */

Route::middleware(['auth'])->group(function () {
    // Di-nonaktifkan sementara agar tidak memicu error missing controller di branch frontend
    // Route::resource('/users', UserController::class);
});


/* ================= ADMIN AREA ================= */

Route::middleware(['auth'])->prefix('admin')->group(function () {

    // DASHBOARD ADMIN
    Route::get('/dashboard', function () {
        return Inertia::render('AdminDashboard', [
            'beritas' => [],
            'laporans' => [] 
        ]);
    })->name('admin.dashboard');

    // HALAMAN LAIN DI ROUTE ADMIN (Biar tidak nyari controller)
    Route::get('/verifikasilaporan', function () {
        return Inertia::render('Admin/VerifikasiLaporan');
    })->name('verifikasi.index');

    Route::get('/profile', function () {
        return Inertia::render('AdminProfile');
    })->name('admin.profile');
});


/* ================= USER AREA ================= */

Route::middleware(['auth'])->prefix('user')->group(function () {

    // DASHBOARD USER
    Route::get('/dashboard', function () {
        return Inertia::render('User/UserDashboard', [
            'laporans' => []
        ]);
    })->name('user.dashboard');

    // LAPORAN USER
    Route::get('/laporan', function () {
        return Inertia::render('User/Laporan');
    })->name('user.laporan');

    // PROFILE USER
    Route::get('/profile', function () {
        return Inertia::render('User/Profile');
    })->name('user.profile');
});


/* ================= AUTHENTICATION SYSTEM ================= */
require __DIR__.'/auth.php';
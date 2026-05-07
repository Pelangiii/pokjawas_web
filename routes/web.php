<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\LaporanController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Models\Laporan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/* ================= LANDING ================= */
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/* ================= DASHBOARD & UMUM ================= */
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // BERITA
    Route::get('/manajemen', [BeritaController::class, 'index'])->name('manajemen.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    // USER MANAGEMENT
    Route::resource('/users', UserController::class);
});

/* ================= ADMIN AREA ================= */
Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('AdminDashboard');
    })->name('admin.dashboard');
    
    Route::get('/users-list', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users');
});

/* ================= USER AREA ================= */
Route::middleware(['auth'])->prefix('user')->group(function () {

    // ✅ DASHBOARD USER
    Route::get('/dashboard', function () {
        $laporans = Laporan::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/UserDashboard', [
            'laporans' => $laporans
        ]);
    })->name('user.dashboard');

    // ✅ LAPORAN
    Route::get('/laporan', [LaporanController::class, 'index'])->name('user.laporan');
    Route::get('/laporan/create', [LaporanController::class, 'create']);
    Route::post('/laporan', [LaporanController::class, 'store']);
    Route::get('/laporan/{id}', [LaporanController::class, 'show']);
    Route::get('/laporan/{id}/edit', [LaporanController::class, 'edit']);
    Route::put('/laporan/{id}', [LaporanController::class, 'update']);
    Route::delete('/laporan/{id}', [LaporanController::class, 'destroy']);

    // ✅ PROFILE USER (FIX UTAMA DI SINI)
    Route::get('/profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::get('/profile/edit', [UserProfileController::class, 'edit']);
    Route::post('/profile', [UserProfileController::class, 'update']);
});

require __DIR__.'/auth.php';
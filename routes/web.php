<?php

use App\Http\Controllers\ReportController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\LaporanController as UserLaporanController;
use App\Http\Controllers\User\ProfileController as UserProfileController;
use App\Models\Laporan;
use App\Models\Berita;
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

Route::middleware(['auth'])->group(function () {

    // BERITA
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::get('/berita/{id}/edit', [BeritaController::class, 'edit'])->name('berita.edit');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

// VERIFIKASI LAPORAN Route::get('/verifikasilaporan', [UserLaporanController::class, 'index']) ->name('verifikasi.index'); Route::patch('/verifikasilaporan/{id}/status', [UserLaporanController::class, 'updateStatus']) ->name('verifikasi.update'); Route::get('/verifikasilaporan/{id}', [UserLaporanController::class, 'show']) ->name('verifikasi.show');
    // USER MANAGEMENT
    Route::resource('/users', UserController::class);

    // PROFILE
    Route::get('/profile', [UserProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [UserProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [UserProfileController::class, 'destroy'])->name('profile.destroy');
});

/* ================= ADMIN AREA ================= */

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

    // DASHBOARD ADMIN
    Route::get('/dashboard', function () {

        $beritas = Berita::latest()
            ->take(5)
            ->get();

        return Inertia::render('AdminDashboard', [
            'beritas' => $beritas
        ]);

    })->name('admin.dashboard');

    // PROFILE ADMIN
    Route::get('/profile', function () {
        return Inertia::render('AdminProfile');
    })->name('admin.profile');

});

/* ================= USER AREA ================= */

Route::middleware(['auth'])->prefix('user')->group(function () {

    // DASHBOARD USER
    Route::get('/dashboard', function () {

        $laporans = Laporan::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/UserDashboard', [
            'laporans' => $laporans
        ]);

    })->name('user.dashboard');

    // LAPORAN
    Route::get('/laporan', [UserLaporanController::class, 'index'])->name('user.laporan');
    Route::get('/laporan/create', [UserLaporanController::class, 'create']);
    Route::post('/laporan', [UserLaporanController::class, 'store']);
    Route::get('/laporan/{id}', [UserLaporanController::class, 'show']);
    Route::get('/laporan/{id}/edit', [UserLaporanController::class, 'edit']);
    Route::put('/laporan/{id}', [UserLaporanController::class, 'update']);
    Route::delete('/laporan/{id}', [UserLaporanController::class, 'destroy']);

    // PROFILE USER
    Route::get('/profile', [UserProfileController::class, 'index'])->name('user.profile');
    Route::get('/profile/edit', [UserProfileController::class, 'edit']);
    Route::post('/profile', [UserProfileController::class, 'update']);
});

require __DIR__.'/auth.php';
<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\LaporanController;
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

    // Route Manajemen Berita
    Route::get('/manajemen', [BeritaController::class, 'index'])->name('manajemen.index');
    Route::get('/berita/tambah', [BeritaController::class, 'create'])->name('berita.create');
    Route::post('/berita', [BeritaController::class, 'store'])->name('berita.store');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('berita.destroy');

    // Route Manajemen User (Tugas utama kita tadi)
    Route::resource('/users', UserController::class);
});

/* ================= PROFILE ================= */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
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
    
    // Dashboard User dengan data Laporan
    Route::get('/dashboard', function () {
        $laporans = Laporan::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/UserDashboard', [
            'laporans' => $laporans
        ]);
    })->name('user.dashboard');

    // CRUD Laporan
    Route::get('/laporan', [LaporanController::class, 'index'])->name('user.laporan');
    Route::get('/laporan/create', [LaporanController::class, 'create'])->name('laporan.create');
    Route::post('/laporan', [LaporanController::class, 'store'])->name('laporan.store');
    Route::get('/laporan/{id}', [LaporanController::class, 'show'])->name('laporan.show');
    Route::get('/laporan/{id}/edit', [LaporanController::class, 'edit'])->name('laporan.edit');
    Route::put('/laporan/{id}', [LaporanController::class, 'update'])->name('laporan.update');
    Route::delete('/laporan/{id}', [LaporanController::class, 'destroy'])->name('laporan.destroy');
});

require __DIR__.'/auth.php';
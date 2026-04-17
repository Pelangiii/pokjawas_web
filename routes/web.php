<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\LaporanController;
use App\Models\Laporan;
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

/* ================= DEFAULT DASHBOARD ================= */
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/* ================= PROFILE ================= */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/* ================= ADMIN ================= */
Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('AdminDashboard');
    });

    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users');

});

/* ================= USER ================= */
Route::middleware(['auth'])->prefix('user')->group(function () {

    // ✅ DASHBOARD (FIX: SESUAI NAMA FILE LO)
    Route::get('/dashboard', function () {

        $laporans = Laporan::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('User/UserDashboard', [ // 🔥 INI FIX NYA
            'laporans' => $laporans
        ]);

    })->name('user.dashboard');

    // ✅ LAPORAN
    Route::get('/laporan', [LaporanController::class, 'index'])
        ->name('user.laporan');

    Route::get('/laporan/create', [LaporanController::class, 'create']);
    Route::post('/laporan', [LaporanController::class, 'store']);
    Route::get('/laporan/{id}', [LaporanController::class, 'show']);
    Route::get('/laporan/{id}/edit', [LaporanController::class, 'edit']);
    Route::put('/laporan/{id}', [LaporanController::class, 'update']);
    Route::delete('/laporan/{id}', [LaporanController::class, 'destroy']);

});

require __DIR__.'/auth.php';
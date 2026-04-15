<?php

use App\Http\Controllers\BeritaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// UPDATE ROUTE MANAJEMEN - tambah name dan middleware
Route::get('/manajemen', function () {
    return Inertia::render('manajemen');
})->middleware(['auth'])->name('manajemen');

Route::get('/berita/create', function () {
    return Inertia::render('Berita/Create');
});


// / ============ ROUTE BERITA ============.                                                  Z  
// // Halaman manajemen berita (pake controller)
// Route::get('/manajemen', [BeritaController::class, 'index'])
//     ->middleware(['auth'])
//     ->name('manajemen');

// // Halaman create berita (kalo lo pake halaman terpisah)
// Route::get('/berita/create', function () {
//     return Inertia::render('Berita/Create');
// })->middleware(['auth'])->name('berita.create');

// // Proses simpan berita
// Route::post('/berita', [BeritaController::class, 'store'])
//     ->middleware(['auth']);

// // Hapus berita
// Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])
//     ->middleware(['auth']);

// // Edit berita (nanti kalo butuh)
// Route::get('/berita/{id}/edit', [BeritaController::class, 'edit'])
//     ->middleware(['auth'])
//     ->name('berita.edit');

// // Update berita
// Route::put('/berita/{id}', [BeritaController::class, 'update'])
//     ->middleware(['auth']);

// Route::post('/berita', [BeritaController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';